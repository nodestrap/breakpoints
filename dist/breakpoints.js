"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isScreenWidth = exports.isScreenWidthBetween = exports.isScreenWidthSmallerThan = exports.isScreenWidthAtLeast = exports.infix = exports.max = exports.min = exports.next = exports.default = exports.breakpoints = void 0;
// cssfn:
const cssfn_1 = require("@cssfn/cssfn"); // cssfn core
exports.breakpoints = {
    xs: 0,
    sm: 576,
    md: 768,
    lg: 992,
    xl: 1200,
    xxl: 1400,
};
exports.default = exports.breakpoints;
const getSortedBreakpoints = () => Object.entries(exports.breakpoints)
    .filter(([breakpointName, breakpointValue]) => breakpointName /*not an empty string*/ && (typeof (breakpointValue) === 'number') /*is a number*/)
    .sort((a, b) => a[1] - b[1]); // sort from smallest value to biggest one
/**
 * Gets the name of the next specified `breakpointName`.
 * @param breakpointName the name of the current breakpoint.
 * @returns the name of the next breakpoint, -or- `null` for the next biggest breakpoint.
 * @throws The specified `breakpointName` is not found in breakpoints.
 */
const next = (breakpointName) => {
    let wasFound = false;
    for (const [searchName] of getSortedBreakpoints()) {
        if (wasFound)
            return searchName;
        if (searchName === breakpointName)
            wasFound = true;
    } // for
    if (!wasFound)
        throw new Error(`Breakpoint '${breakpointName}' is not found in breakpoints.`);
    return null; // found but it's the biggest => return `null`
};
exports.next = next;
/**
 * Gets the minimum breakpoint width of the specified `breakpointName`.
 * @param breakpointName the breakpoint's name to get the minimum width.
 * @returns the minimum width of the specified `breakpointName`, -or- `null` for the smallest breakpoint.
 * @throws The specified `breakpointName` is not found in breakpoints.
 */
const min = (breakpointName) => {
    const value = getSortedBreakpoints().find(([searchName]) => (searchName === breakpointName))?.[1];
    if (value === undefined)
        throw new Error(`Breakpoint '${breakpointName}' is not found in breakpoints.`);
    if (value === 0)
        return null;
    return value;
};
exports.min = min;
/**
 * Gets the maximum breakpoint width _before_ reaching the specified `breakpointName`.
 * @param breakpointName the breakpoint's name to get the maximum width.
 * @returns the maximum width of the specified `breakpointName`, -or- `null` for the smallest breakpoint.
 * @throws The specified `breakpointName` is not found in breakpoints.
 */
const max = (breakpointName) => {
    const value = (0, exports.min)(breakpointName);
    if (value === null)
        return null;
    if ((value >= 0.02))
        return (value - 0.02);
    return value;
};
exports.max = max;
/**
 * Returns a blank string for the smallest breakpoint, otherwise returns the `breakpointName` with a dash in front.
 * @param breakpointName the breakpoint's name to get the infix.
 * @returns `-${breakpointName}` -or- `null` for the smallest breakpoint.
 * @throws The specified `breakpointName` is not found in breakpoints.
 */
const infix = (breakpointName) => {
    if ((0, exports.min)(breakpointName) === null)
        return null;
    return `-${breakpointName}`;
};
exports.infix = infix;
// rules:
/**
 * Applies given `styles` if the screen width is equal to / bigger than the specified `breakpointName`.
 * @param breakpointName the name of the minimum breakpoint.
 * @param styles the style(s) to apply if the screen width meets the minimum breakpoint width.
 * @returns A `RuleEntry` represents the media rule.
 * @throws The specified `breakpointName` is not found in breakpoints.
 */
const isScreenWidthAtLeast = (breakpointName, styles) => {
    const minWidth = (0, exports.min)(breakpointName);
    return (0, cssfn_1.rule)((minWidth ? `@media (min-width: ${minWidth}px)` : null), styles);
};
exports.isScreenWidthAtLeast = isScreenWidthAtLeast;
/**
 * Applies given `styles` if the screen width is smaller than the specified `breakpointName`.
 * @param breakpointName the name of the maximum breakpoint.
 * @param styles the style(s) to apply if the screen width meets the maximum breakpoint width.
 * @returns A `RuleEntry` represents the media rule.
 * @throws The specified `breakpointName` is not found in breakpoints.
 */
const isScreenWidthSmallerThan = (breakpointName, styles) => {
    const maxWidth = (0, exports.max)(breakpointName);
    return (0, cssfn_1.rule)((maxWidth ? `@media (max-width: ${maxWidth}px)` : null), styles);
};
exports.isScreenWidthSmallerThan = isScreenWidthSmallerThan;
/**
 * Applies given `styles` if the screen width is between the specified `lowerBreakpointName` and `upperBreakpointName`.
 * @param lowerBreakpointName the name of the minimum breakpoint.
 * @param upperBreakpointName the name of the maximum breakpoint.
 * @param styles the style(s) to apply if the screen width meets the minimum & maximum breakpoint width.
 * @returns A `RuleEntry` represents the media rule.
 * @throws The specified `lowerBreakpointName` or `upperBreakpointName` are not found in breakpoints.
 */
const isScreenWidthBetween = (lowerBreakpointName, upperBreakpointName, styles) => {
    const minWidth = (0, exports.min)(lowerBreakpointName);
    const maxWidth = (0, exports.max)(upperBreakpointName);
    if (minWidth && maxWidth) {
        return (0, cssfn_1.rule)(`@media (min-width: ${minWidth}px) and (max-width: ${maxWidth}px)`, styles);
    }
    else if (minWidth) {
        return (0, cssfn_1.rule)(`@media (min-width: ${minWidth}px)`, styles);
    }
    else if (maxWidth) {
        return (0, cssfn_1.rule)(`@media (max-width: ${maxWidth}px)`, styles);
    }
    else {
        return (0, cssfn_1.noRule)(styles);
    } // if
};
exports.isScreenWidthBetween = isScreenWidthBetween;
/**
 * Applies given `styles` if the screen width is between the specified `breakpointName` and the next breakpoint.
 * @param breakpointName the name of the desired breakpoint.
 * @param styles the style(s) to apply if the screen width meets the minimum & maximum breakpoint width.
 * @returns A `RuleEntry` represents the media rule.
 * @throws The specified `breakpointName` is not found in breakpoints.
 */
const isScreenWidth = (breakpointName, styles) => {
    const minWidth = (0, exports.min)(breakpointName);
    const nextBp = (0, exports.next)(breakpointName);
    const maxWidth = nextBp ? (0, exports.max)(nextBp) : null;
    if (minWidth && maxWidth) {
        return (0, cssfn_1.rule)(`@media (min-width: ${minWidth}px) and (max-width: ${maxWidth}px)`, styles);
    }
    else if (minWidth) {
        return (0, cssfn_1.rule)(`@media (min-width: ${minWidth}px)`, styles);
    }
    else if (maxWidth) {
        return (0, cssfn_1.rule)(`@media (max-width: ${maxWidth}px)`, styles);
    }
    else {
        return (0, cssfn_1.noRule)(styles);
    } // if
};
exports.isScreenWidth = isScreenWidth;
