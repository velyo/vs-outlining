using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using Microsoft.VisualStudio.Text;

namespace Artem.VisualStudio.Outlining {

    internal enum SectionType {
        None,
        CodeBlock,
        Region,
        Comment
    }

    internal class TrackingSection {

        #region Properties

        public ITrackingSpan Span { get; set; }

        public string Text { get; set; }

        public SectionType Type { get; set; }

        #endregion

        #region Ctor

        public TrackingSection(ITrackingSpan span, SectionType type, string text) {
            this.Span = span;
            this.Type = type;
            this.Text = text;
        }

        public TrackingSection(ITrackingSpan span, SectionType type)
            : this(span, type, null) {
        }


        public TrackingSection(ITrackingSpan span)
            : this(span, SectionType.CodeBlock, null) {
        }
        #endregion
    }
}
