// Guids.cs
// MUST match guids.h
using System;

namespace Artem.VisualStudio.Outlining {
    static class GuidList {
        public const string guidOutliningPkgString = "fd797919-4930-4e69-ba77-2c49710c8fa4";
        public const string guidOutliningCmdSetString = "36af28ad-0e36-4b60-a205-1bb0042f0e15";

        public static readonly Guid guidJsOutliningCmdSet = new Guid(guidOutliningCmdSetString);
    };
}