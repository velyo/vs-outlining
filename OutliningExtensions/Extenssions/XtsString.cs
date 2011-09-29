using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace System {
    
    internal static class XtsString {

        #region Static Methods

        /// <summary>
        /// Output a string using the provided format and arguments.
        /// </summary>
        /// <param name="value">The value.</param>
        /// <param name="args">The args.</param>
        /// <returns></returns>
        public static string F(this string value, params object[] args) {
            return (!string.IsNullOrEmpty(value)) ? string.Format(value, args) : value;
        }

        /// <summary>
        /// Determines whether the specified value is null.
        /// </summary>
        /// <param name="value">The value.</param>
        /// <returns>
        /// 	<c>true</c> if the specified value is null; otherwise, <c>false</c>.
        /// </returns>
        public static bool IsNull(this string value) {
            return value == null;
        }

        /// <summary>
        /// Determines whether [is null or empty] [the specified value].
        /// </summary>
        /// <param name="value">The value.</param>
        /// <returns>
        /// 	<c>true</c> if [is null or empty] [the specified value]; otherwise, <c>false</c>.
        /// </returns>
        public static bool IsNullOrEmpty(this string value) {
            return (value == null || value.Length == 0);
        }

        /// <summary>
        /// Determines whether [is not null or empty] [the specified value].
        /// </summary>
        /// <param name="value">The value.</param>
        /// <returns>
        /// 	<c>true</c> if [is not null or empty] [the specified value]; otherwise, <c>false</c>.
        /// </returns>
        public static bool IsNotNullOrEmpty(this string value) {
            return !IsNullOrEmpty(value);
        }

        /// <summary>
        /// Trims to size.
        /// </summary>
        /// <param name="value">The value.</param>
        /// <param name="size">The size.</param>
        /// <returns></returns>
        public static string TrimToSize(this string value, int size, bool eclipsed = true) {

            if (IsNotNullOrEmpty(value)) {
                int offset = eclipsed ? 3 : 0;
                if ((value.Length + offset) > size) {
                    StringBuilder buffer = new StringBuilder(value);
                    buffer.Length = size;
                    if (eclipsed)
                        buffer.Append("...");
                    return buffer.ToString();
                }
            }
            return value;
        }
        #endregion
    }
}
