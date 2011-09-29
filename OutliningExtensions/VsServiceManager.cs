using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection;
using System.Text;

namespace Artem.VisualStudio.Outlining {

    public static class VsServiceManager {

        #region Static Fields

        static Assembly _html = Assembly.Load("Microsoft.VisualStudio.Web.HTML");
        static Type _IHtmServiceMangerType = _html.GetType("Microsoft.VisualStudio.Web.HTML.IHtmServiceManager");
        static Guid _IScriptColorizerGuid = new Guid("AE53377E-D59A-4021-9C5C-071FB291771C");

        #endregion

        #region Static Methods

        //public static ILanguageBlockManager GetLanguageBlockManager(ITextBuffer buffer) {
        //    Guid lbmGuid = typeof(ILanguageBlockManager).GUID;
        //    return GetService(buffer, lbmGuid) as ILanguageBlockManager;
        //}

        //public static IClassifier GetScriptColorizer(ITextBuffer buffer) {
        //    return GetService(buffer, _IScriptColorizerGuid) as IClassifier;
        //}

        //public static object GetService(ITextBuffer buffer, Guid serviceGuid) {
        //    IHtmServiceManager serviceManager = null;
        //    IVsTextBuffer vsTextBuffer;
        //    buffer.Properties.TryGetProperty<IVsTextBuffer>(typeof(IVsTextBuffer), out vsTextBuffer);

        //    if (vsTextBuffer != null) {
        //        var guid = typeof(IHtmServiceManager).GUID;
        //        var userData = vsTextBuffer as IVsUserData;

        //        object serviceManagerObject;
        //        int hr = userData.GetData(ref guid, out serviceManagerObject);

        //        if (VSConstants.S_OK == hr && serviceManagerObject != null) {
        //            serviceManager = serviceManagerObject as IHtmServiceManager;
        //        }
        //    }
        //    else {
        //        buffer.Properties.TryGetProperty(_IHtmServiceMangerType, out serviceManager);
        //    }

        //    return serviceManager.TryFindService(ref serviceGuid, ref serviceGuid);
        //}
        #endregion
    }
}
