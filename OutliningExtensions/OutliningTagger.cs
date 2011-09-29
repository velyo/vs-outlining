using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Text;
using System.Text.RegularExpressions;
using System.Windows.Threading;
using Microsoft.VisualStudio.Text;
using Microsoft.VisualStudio.Text.Classification;
using Microsoft.VisualStudio.Text.Tagging;

namespace Artem.VisualStudio.Outlining {

    internal abstract class OutliningTagger : ITagger<IOutliningRegionTag>, IDisposable {

        #region Properties

        protected ITextBuffer Buffer { get; private set; }

        protected IClassifier Classifier { get; private set; }

        protected ITrackingSpan EditSpan { get; set; }

        protected bool FullRefactoring { get; set; }

        protected List<TrackingSection> Sections { get; private set; }

        protected DispatcherTimer Timer { get; private set; }

        #endregion

        #region Ctor/Dtor

        /// <summary>
        /// Initializes a new instance of the <see cref="OutliningTagger"/> class.
        /// </summary>
        /// <param name="buffer">The buffer.</param>
        /// <param name="classifier">The classifier.</param>
        public OutliningTagger(ITextBuffer buffer, IClassifier classifier) {

            Buffer = buffer;
            Classifier = classifier;
            FullRefactoring = true;
            Sections = new List<TrackingSection>();
            Timer = new DispatcherTimer(DispatcherPriority.ApplicationIdle);

            Buffer.Changed += HandleBufferChanged;

            Timer.Interval = TimeSpan.FromSeconds(3);
            Timer.Tick += (sender, args) => {
                Timer.Stop();
                this.Refactor();
            };

            this.Refactor();
        }

        /// <summary>
        /// Performs application-defined tasks associated with freeing, releasing, or resetting unmanaged resources.
        /// </summary>
        public void Dispose() {
            if (Timer.IsEnabled) Timer.Stop();
            Buffer.Changed -= HandleBufferChanged;
        }
        #endregion

        #region Methods

        /// <summary>
        /// Calculates the change.
        /// </summary>
        /// <param name="e">The <see cref="Microsoft.VisualStudio.Text.TextContentChangedEventArgs"/> instance containing the event data.</param>
        protected virtual void CalculateChange(TextContentChangedEventArgs e) {

            // full refactoring is in progress, then no need to calculate
            if (this.FullRefactoring) return;

            // changes are more than 1, then set full refactor state
            if (e.Changes.Count > 1) {
                this.FullRefactoring = true;
                return;
            }

            ITextChange textChange = e.Changes[0];
            if (this.EditSpan == null) {
                // set the edit span to change
                this.EditSpan = this.Buffer.CurrentSnapshot.CreateTrackingSpan(
                   textChange.NewPosition,
                   textChange.NewEnd - textChange.NewPosition,
                   SpanTrackingMode.EdgeInclusive);
            }
            else {
                // merge edit span with old and new change
                int oldEditStartPosition = this.EditSpan.GetStartPoint(this.Buffer.CurrentSnapshot).Position;
                int oldEditEndPosition = this.EditSpan.GetEndPoint(this.Buffer.CurrentSnapshot).Position;
                // In many cases, new edit is auto-merged with old edit by tracking span. To be more'
                // specific, in all cases when new edit is adjacent to the old edit, it will be
                // auto-merged. We need to create a new tracking span only if the new edit was non-adjacent
                // to the old edit (i.e. a few characters before the old edit or a few characters after
                // the old edit).
                if (textChange.NewPosition < oldEditStartPosition || textChange.NewPosition > oldEditEndPosition) {
                    int newEditStartPosition = Math.Min(textChange.NewPosition, oldEditStartPosition);
                    int newEditEndPosition = Math.Max(textChange.NewEnd, oldEditEndPosition);
                    this.EditSpan = this.Buffer.CurrentSnapshot.CreateTrackingSpan(
                        newEditStartPosition,
                        newEditEndPosition - newEditStartPosition,
                        SpanTrackingMode.EdgeInclusive);
                }
            }
        }

        /// <summary>
        /// Gets the index of the edit span.
        /// </summary>
        /// <returns></returns>
        protected virtual int GetEditSpanIndex() {

            int index = -1;

            if (!this.FullRefactoring && (this.EditSpan != null)) {
                int editStart = this.EditSpan.GetStartPoint(this.Buffer.CurrentSnapshot).Position;
                int editEnd = this.EditSpan.GetEndPoint(this.Buffer.CurrentSnapshot).Position;

                for (int i = this.Sections.Count - 1; i >= 0; i--) {
                    var section = this.Sections[i];
                    int spanStart = section.Span.GetStartPoint(this.Buffer.CurrentSnapshot).Position;
                    int spanEnd = section.Span.GetEndPoint(this.Buffer.CurrentSnapshot).Position;

                    if (spanEnd < editStart) break;

                    if ((spanStart < editStart) && (spanEnd > editEnd)) {
                        index = i;
                        break;
                    }
                }
            }

            return index;
        }

        /// <summary>
        /// Handles the buffer changed.
        /// </summary>
        /// <param name="sender">The sender.</param>
        /// <param name="e">The <see cref="Microsoft.VisualStudio.Text.TextContentChangedEventArgs"/> instance containing the event data.</param>
        protected virtual void HandleBufferChanged(object sender, TextContentChangedEventArgs e) {

            // If this isn't the most up-to-date version of the buffer, 
            // then ignore it for now (we'll eventually get another change event).
            if (e.After != Buffer.CurrentSnapshot) return;

            this.CalculateChange(e);

            // reset timer if buffer is changing
            if (Timer.IsEnabled) Timer.Stop();
            Timer.Start();
        }

        /// <summary>
        /// Refactors this instance.
        /// </summary>
        protected virtual void Refactor() {

            int rangeStart = 0;
            int rangeEnd = 0;
            int spanIndex = -1;

            try {
                if (this.FullRefactoring) {
                    rangeStart = 0;
                    rangeEnd = this.Buffer.CurrentSnapshot.Length;
                }
                else {
                    spanIndex = GetEditSpanIndex();
                    if (spanIndex >= 0) {
                        // partial
                        rangeStart = this.Sections[spanIndex].Span.GetStartPoint(this.Buffer.CurrentSnapshot).Position;
                        rangeEnd = this.Sections[spanIndex].Span.GetEndPoint(this.Buffer.CurrentSnapshot).Position;
                    }
                    else {
                        this.FullRefactoring = true;
                        rangeStart = 0;
                        rangeEnd = this.Buffer.CurrentSnapshot.Length;
                    }
                }

                if (rangeEnd > rangeStart) {
                    this.Parse(rangeStart, rangeEnd, spanIndex);
                }
            }
            finally {
                this.FullRefactoring = false;
                this.EditSpan = null;
            }
        }

        /// <summary>
        /// Refactors the specified range start.
        /// </summary>
        /// <param name="rangeStart">The range start.</param>
        /// <param name="rangeEnd">The range end.</param>
        /// <param name="spanIndex">Index of the span.</param>
        protected virtual void Parse(int rangeStart, int rangeEnd, int spanIndex) {

#if DEBUG
            var startTime = DateTime.Now.Ticks;
#endif
            var snapshot = this.Buffer.CurrentSnapshot;
            bool unbalanced = false;
            var currentSections = this.ParseRange(snapshot, rangeStart, rangeEnd, out unbalanced);

            if (spanIndex == -1) {
                this.Sections = currentSections;
            }
            else {
                if (currentSections.Count > 0) {
                    // We do depth-first traversal when we are collecting curlies, and we add them to the list as
                    // we return, so the outer-most section will be the last in the list.
                    var outerMostSection = currentSections[currentSections.Count -1];
                    int outerMostSectionStart = outerMostSection.Span.GetStartPoint(snapshot).Position;
                    int outerMostSectionEnd = outerMostSection.Span.GetEndPoint(snapshot).Position;

                    if (outerMostSectionStart == rangeStart && outerMostSectionEnd == rangeEnd) {
                        this.Sections[spanIndex] = outerMostSection;
                    }
                    else {
                        // Partial reparse failed because
                        rangeStart = 0;
                        rangeEnd = snapshot.Length;
                        this.Sections = ParseRange(snapshot, rangeStart, rangeEnd, out unbalanced);
                    }
                }
            }

#if DEBUG
            long elapsedTime = DateTime.Now.Ticks - startTime;
            Debug.WriteLine("Refactor({0}, {1}, {2}) with elapsed time of {3} milliseconds", rangeStart, rangeEnd, spanIndex, elapsedTime / 10000);
#endif
        }

        #endregion

        #region Parse Methods

        protected abstract List<TrackingSection> ParseRange(ITextSnapshot snapshot, int rangeStart, int rangeEnd, out bool unbalanced);

        #endregion

        #region ITagger<IOutliningRegionTag> Members

        /// <summary>
        /// Gets the tags.
        /// </summary>
        /// <param name="spans">The spans.</param>
        /// <returns></returns>
        public IEnumerable<ITagSpan<IOutliningRegionTag>> GetTags(Microsoft.VisualStudio.Text.NormalizedSnapshotSpanCollection spans) {

            if (this.Sections == null || this.Sections.Count == 0 || spans.Count == 0)
                yield break;

            var snapshot = spans[0].Snapshot;

            foreach (var section in this.Sections) {
                var sectionSpan = section.Span.GetSpan(snapshot);

                if (spans.IntersectsWith(new NormalizedSnapshotSpanCollection(sectionSpan))) {
                    var collapsedHintText = sectionSpan.Length <= 250 ?
                        sectionSpan.GetText() :
                        snapshot.GetText(sectionSpan.Start, 249) + "…";

                    string text;
                    switch (section.Type) {
                        case SectionType.CodeBlock:
                            text = "{}";
                            break;
                        case SectionType.Comment:
                        case SectionType.Region:
                            text = section.Text;
                            if (text.IsNotNullOrEmpty()) text = text.Trim();
                            break;
                        default:
                            text = "";
                            break;
                    }

                    var tag = new OutliningRegionTag(text, collapsedHintText);
                    yield return new TagSpan<IOutliningRegionTag>(sectionSpan, tag);
                }
            }
        }

        /// <summary>
        /// Occurs when [tags changed].
        /// </summary>
        public event EventHandler<SnapshotSpanEventArgs> TagsChanged;

        #endregion
    }
}
