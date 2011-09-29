using System;
using System.Collections.Generic;
using System.ComponentModel.Composition;
using System.Linq;
using System.Text;
using Microsoft.VisualStudio.Text.Classification;
using Microsoft.VisualStudio.Text.Tagging;
using Microsoft.VisualStudio.Utilities;

namespace Artem.VisualStudio.Outlining {

    /// <summary>
    /// 
    /// </summary>
    [ContentType("JScript")]
    //[ContentType("HTML")]
    [Export(typeof(ITaggerProvider))]
    [TagType(typeof(IOutliningRegionTag))]
    sealed class JsOutliningTaggerProvider : ITaggerProvider {

        #region Properties

        [Import]
        internal IClassifierAggregatorService ClassifierAggregatorService { get; set; }

        #endregion

        #region Methods

        public ITagger<T> CreateTagger<T>(Microsoft.VisualStudio.Text.ITextBuffer buffer) where T : ITag {

            var classifier = ClassifierAggregatorService.GetClassifier(buffer);
            Func<ITagger<T>> creator = () => { return new JsOutliningTagger(buffer, classifier) as ITagger<T>; };
            return buffer.Properties.GetOrCreateSingletonProperty<ITagger<T>>(creator);
        }
        #endregion
    }
}
