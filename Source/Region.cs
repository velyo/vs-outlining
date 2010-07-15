using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using Microsoft.VisualStudio.Text;
using Microsoft.VisualStudio.Text.Tagging;

namespace Artem.VisualStudio.Outlining {

    enum RegionType {
        None,
        Block,
        Custom
    }

    class Region {

        #region Properties  ///////////////////////////////////////////////////////////////////////

        public SnapshotPoint End { get; set; }

        public int EndLine { get; set; }

        public SnapshotPoint Start { get; set; }

        public int StartLine { get; set; }

        public string Text { get; set; }

        public RegionType Type { get; set; }

        #endregion

        #region Methods ///////////////////////////////////////////////////////////////////////////

        /// <summary>
        /// Ases the snapshot span.
        /// </summary>
        /// <returns></returns>
        public SnapshotSpan AsSnapshotSpan() {
            return new SnapshotSpan(this.Start, this.End);
        }

        /// <summary>
        /// Ases the outlining region tag.
        /// </summary>
        /// <returns></returns>
        public TagSpan<IOutliningRegionTag> AsOutliningRegionTag() {

            var span = this.AsSnapshotSpan();
            bool collapsed = (this.Type == RegionType.Custom);
            var tag = new OutliningRegionTag(collapsed, false, this.Text, span.GetText());

            return new TagSpan<IOutliningRegionTag>(span, tag);
        }
        #endregion
    }
}
