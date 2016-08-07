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
    [ContentType("CSS")]
    [Export(typeof(ITaggerProvider))]
    [TagType(typeof(IOutliningRegionTag))]
    public class CssOutliningTaggerProvider : ITaggerProvider {

        #region Properties

        [Import]
        internal IClassifierAggregatorService ClassifierAggregatorService { get; set; }

        #endregion

        #region Methods

        /// <summary>
        /// Creates the tagger.
        /// </summary>
        /// <typeparam name="T"></typeparam>
        /// <param name="buffer">The buffer.</param>
        /// <returns></returns>
        public ITagger<T> CreateTagger<T>(Microsoft.VisualStudio.Text.ITextBuffer buffer) where T : ITag {

            var classifier = this.ClassifierAggregatorService.GetClassifier(buffer);
            Func<ITagger<T>> creator = () => { return new CssOutliningTagger(buffer, classifier) as ITagger<T>; };
            return buffer.Properties.GetOrCreateSingletonProperty<ITagger<T>>(creator);
        }
        #endregion
    }
}
