using System;
using System.Collections.Generic;
using System.ComponentModel.Composition;
using System.Linq;
using System.Text;
using Microsoft.VisualStudio.Text.Tagging;
using Microsoft.VisualStudio.Utilities;
using Microsoft.VisualStudio.Text.Classification;

namespace Artem.VisualStudio.JsOutlining {

    [ContentType("CSS")]
    [ContentType("JScript")]
    [Export(typeof(ITaggerProvider))]
    [TagType(typeof(IOutliningRegionTag))]
    public class JsOuliningTaggerProvider : ITaggerProvider {

        #region ITaggerProvider Members

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
