using System;
using System.Collections.Generic;
using System.ComponentModel.Composition;
using System.Diagnostics;
using System.Linq;
using System.Text;
using System.Text.RegularExpressions;
using System.Windows.Threading;
using Microsoft.VisualStudio.Text;
using Microsoft.VisualStudio.Text.Outlining;
using Microsoft.VisualStudio.Text.Tagging;
using Microsoft.VisualStudio.Utilities;
using Microsoft.VisualStudio.Text.Classification;

namespace Artem.VisualStudio.Outlining {

    /// <summary>
    /// 
    /// </summary>
    internal sealed class JsOutliningTagger : OutliningTagger {

        #region Static Fields

        static readonly string _RegionBeginPattern = @"((?://\s*\#region)|(?://\s*\#\>))(?<text>.*)";
        static readonly string _RegionEndPattern = @"(?://\s*\#endregion)|(?://\s*\#\<)";
        static readonly string _RegionLongBeginPattern = @"((?:/\*\s*\#region)|(?:/\*\s*\#\>))(?<text>.*)(?:\*/)";
        static readonly string _RegionLongEndPattern = @"(?:/\*\s*\#endregion)|(?:/\*\s*\#\<)(?:\*/)";

        #endregion

        #region Ctor

        public JsOutliningTagger(ITextBuffer buffer, IClassifier classifier)
            : base(buffer, classifier) {
        }
        #endregion

        #region Methods

        /// <summary>
        /// Refactors the range.
        /// </summary>
        /// <param name="snapshot">The snapshot.</param>
        /// <param name="rangeStart">The range start.</param>
        /// <param name="rangeEnd">The range end.</param>
        /// <param name="unbalanced">if set to <c>true</c> [unbalanced].</param>
        /// <returns></returns>
        protected override List<TrackingSection> ParseRange(ITextSnapshot snapshot, int rangeStart, int rangeEnd, out bool unbalanced) {

            var openComments = new Stack<int>();
            var openCurlies = new Stack<int>();
            var openRegions = new Stack<int>();
            var regionsText = new Stack<string>();
            SnapshotPoint point;
            var sections = new List<TrackingSection>();

            unbalanced = false;

            for (int i = rangeStart; i < rangeEnd; i++) {
                var ch = snapshot[i];

                switch (ch) {
                    case '{':
                    case '}':
                        point = new SnapshotSpan(snapshot, i, 1).Start;
                        if (!this.Classifier.IsClassifiedAs(point, ScriptClassifications.Comment, ScriptClassifications.String, ScriptClassifications.Operator)) {
                            switch (ch) {
                                case '{':
                                    openCurlies.Push(i);
                                    break;
                                case '}':
                                    if (openCurlies.Count > 0) {
                                        int start = openCurlies.Pop();
                                        var line = snapshot.GetLineFromPosition(i);
                                        if (start < line.Start.Position) {
                                            var span = snapshot.CreateTrackingSpan(start, i - start + 1, SpanTrackingMode.EdgeExclusive);
                                            sections.Add(new TrackingSection(span));
                                        }
                                    }
                                    else {
                                        unbalanced = true;
                                    }
                                    break;
                            }
                        }
                        break;
                    case '/':
                        point = new SnapshotSpan(snapshot, i, 1).Start;
                        if (this.Classifier.IsClassifiedAs(point, ScriptClassifications.Comment)) {

                            var line = snapshot.GetLineFromPosition(i);
                            var text = line.GetText();
                            Match match;

                            // test for region begin
                            if (TestForRegionBegin(text, out match)) {
                                openRegions.Push(i);
                                regionsText.Push(match.Groups["text"].Value);
                                i += match.Length - 1;
                            }
                            else {
                                // test for short end region
                                if (TestForRegionEnd(text, out match)) {
                                    if (openRegions.Count > 0) {
                                        int start = openRegions.Pop();
                                        var span = snapshot.CreateTrackingSpan(start, (i - start) + match.Length, SpanTrackingMode.EdgeExclusive);
                                        sections.Add(new TrackingSection(span, SectionType.Region, regionsText.Pop()));
                                    }
                                    else {
                                        unbalanced = true;
                                    }
                                    i += match.Length - 1;
                                }
                                else {
                                    int start = i;
                                    // parse /* */ comment
                                    if (((i + 1) < rangeEnd) && (((ch = snapshot[++i]) == '*'))) {
                                        for (i++; i < rangeEnd; i++) {
                                            ch = snapshot[i];
                                            if (ch == '*') {
                                                if (((i + 1) < rangeEnd) && (((ch = snapshot[++i]) == '/'))) {
                                                    line = snapshot.GetLineFromPosition(i);
                                                    if (start < line.Start.Position) {
                                                        var span = snapshot.CreateTrackingSpan(start, i - start + 1, SpanTrackingMode.EdgeExclusive);
                                                        sections.Add(new TrackingSection(span, SectionType.Comment, text));
                                                    }
                                                    break;
                                                }
                                            }
                                        }
                                    }
                                    else {
                                        // it is a // comment, test for mutliple lines of it
                                        int count = 0;
                                        string lineText = line.GetText();

                                        while (lineText.Trim().StartsWith("//")) {
                                            count++;
                                            i = line.EndIncludingLineBreak.Position;
                                            if (i >= rangeEnd) break;
                                            point = new SnapshotSpan(snapshot, i, 1).Start;
                                            line = snapshot.GetLineFromPosition(i);
                                            lineText = line.GetText();
                                        }

                                        if (count > 1) {
                                            int length = i - line.LineBreakLength - start - 1;
                                            var span = snapshot.CreateTrackingSpan(start, length, SpanTrackingMode.EdgeExclusive);
                                            sections.Add(new TrackingSection(span, SectionType.Comment, text));
                                        }
                                    }
                                }
                            }
                        }
                        break;
                }
            }

            if ((openRegions.Count > 0) || (openCurlies.Count > 0)) unbalanced = true;

            return sections;
        }

        /// <summary>
        /// Tests for region begin.
        /// </summary>
        /// <param name="text">The text.</param>
        /// <param name="match">The match.</param>
        /// <returns></returns>
        private bool TestForRegionBegin(string text, out Match match) {

            match = Regex.Match(text, _RegionBeginPattern, RegexOptions.Compiled | RegexOptions.Singleline);
            if (!match.Success)
                match = Regex.Match(text, _RegionLongBeginPattern, RegexOptions.Compiled | RegexOptions.Singleline);
            return match.Success;
        }

        /// <summary>
        /// Tests for region end.
        /// </summary>
        /// <param name="text">The text.</param>
        /// <param name="match">The match.</param>
        /// <returns></returns>
        private bool TestForRegionEnd(string text, out Match match) {

            match = Regex.Match(text, _RegionEndPattern, RegexOptions.Compiled | RegexOptions.Singleline);
            if (!match.Success)
                match = Regex.Match(text, _RegionLongEndPattern, RegexOptions.Compiled | RegexOptions.Singleline);
            return match.Success;
        }
        #endregion
    }
}
