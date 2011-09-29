using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace Artem.VisualStudio.Outlining {


    public static class CssClassifications {
        public readonly static string Comment = "CSS Comment";
    }

    public static class ScriptClassifications {
        public readonly static string Comment = "Script Comment";
        public readonly static string String = "Script String";
        public readonly static string Keyword = "Script Keyword";
        public readonly static string Operator = "Script Operator";
        public readonly static string Identifier = "Script Identifier";
        public readonly static string None = null;
    }
}
