using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using Microsoft.VisualStudio.Text.Tagging;
using Microsoft.VisualStudio.Text;
using System.Text.RegularExpressions;
using Microsoft.VisualStudio.Text.Classification;

namespace Artem.VisualStudio.Outlining {

    /// <summary>
    /// 
    /// </summary>
    internal sealed class CssOutliningTagger : OutliningTagger {

        #region Static Fields

        static readonly string _RegionBeginPattern = @"((?:/\*\s*\#region)|(?:/\*\s*\#\>))(?<text>.*)(?:\*/)";
        static readonly string _RegionEndPattern = @"(?:/\*\s*\#endregion)|(?:/\*\s*\#\<)(?:\*/)";

        #endregion

        #region Ctor

        public CssOutliningTagger(ITextBuffer buffer, IClassifier classifier)
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
                        if (!this.Classifier.IsClassifiedAs(point, CssClassifications.Comment)) {
                            switch (ch) {
                                case '{':
                                    openCurlies.Push(i);
                                    break;
                                case '}':
                                    if (openCurlies.Count > 0) {
                                        int start = openCurlies.Pop();
                                        var line = this.Buffer.CurrentSnapshot.GetLineFromPosition(i);
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
                        if (this.Classifier.IsClassifiedAs(point, CssClassifications.Comment)) {

                            var line = snapshot.GetLineFromPosition(i);
                            var text = line.GetText();
                            var match = Regex.Match(text, _RegionBeginPattern, RegexOptions.Compiled | RegexOptions.Singleline);

                            if (match.Success) {
                                openRegions.Push(i);
                                regionsText.Push(match.Groups["text"].Value);
                                i += match.Length + 1;
                            }
                            else {
                                match = Regex.Match(text, _RegionEndPattern, RegexOptions.Compiled | RegexOptions.Singleline);

                                if (match.Success) {
                                    if (openRegions.Count > 0) {
                                        int start = openRegions.Pop();
                                        var span = snapshot.CreateTrackingSpan(start, (i - start) + match.Length, SpanTrackingMode.EdgeExclusive);
                                        sections.Add(new TrackingSection(span, SectionType.Region, regionsText.Pop()));
                                    }
                                    else {
                                        unbalanced = true;
                                    }
                                    i += match.Length + 1;
                                }
                                else {
                                    int start = i;
                                    for (i++; i < rangeEnd; i++) {
                                        ch = snapshot[i];
                                        if (ch == '*') {
                                            if (((i + 1) < rangeEnd) && (((ch = snapshot[++i]) == '/'))) {
                                                line = this.Buffer.CurrentSnapshot.GetLineFromPosition(i);
                                                if (start < line.Start.Position) {
                                                    var span = snapshot.CreateTrackingSpan(start, i - start + 1, SpanTrackingMode.EdgeExclusive);
                                                    sections.Add(new TrackingSection(span, SectionType.Comment, text));
                                                }
                                                break;
                                            }
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
        #endregion
    }
}
