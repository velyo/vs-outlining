// Guids.cs
// MUST match guids.h
using System;

namespace Artem.VisualStudio.JsOutlining
{
    static class GuidList
    {
        public const string guidJsOutliningPkgString = "fd797919-4930-4e69-ba77-2c49710c8fa4";
        public const string guidJsOutliningCmdSetString = "36af28ad-0e36-4b60-a205-1bb0042f0e15";

        public static readonly Guid guidJsOutliningCmdSet = new Guid(guidJsOutliningCmdSetString);
    };
}