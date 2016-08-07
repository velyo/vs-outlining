using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace Microsoft.VisualStudio.Text.Classification {

    /// <summary>
    /// 
    /// </summary>
    internal static class XtsIClassifier {

        #region Static Methods

        public static bool IsClassifiedAs(this IClassifier classifier, SnapshotPoint startPoint, params string[] names) {

            if ((classifier != null) && (startPoint != null) && (names != null)) {
                var spans = classifier.GetClassificationSpans(new SnapshotSpan(startPoint, 1));
                var span = spans.FirstOrDefault();
                if (span == null) return false;
                return (names.Contains(span.ClassificationType.Classification));
            }
            return false;
        }
        #endregion
    }
}
