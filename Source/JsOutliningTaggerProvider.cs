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
    [Export(typeof(ITaggerProvider))]
    [TagType(typeof(IOutliningRegionTag))]
    public class JsOutliningTaggerProvider : ITaggerProvider {

        #region Methods ///////////////////////////////////////////////////////////////////////////

        /// <summary>
        /// Creates the tagger.
        /// </summary>
        /// <typeparam name="T"></typeparam>
        /// <param name="buffer">The buffer.</param>
        /// <returns></returns>
        public ITagger<T> CreateTagger<T>(Microsoft.VisualStudio.Text.ITextBuffer buffer) where T : ITag {
            //Func<ITagger<T>> creator = () => { return new JsOutliningTagger(buffer) as ITagger<T>; };
            //return buffer.Properties.GetOrCreateSingletonProperty<ITagger<T>>(creator);
            return new JsOutliningTagger(buffer) as ITagger<T>;
        }
        #endregion
    }
}
