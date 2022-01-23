// cssfn:
import { 
// rules:
rule, noRule, } from '@cssfn/cssfn'; // cssfn core
export const breakpoints = {
    xs: 0,
    sm: 576,
    md: 768,
    lg: 992,
    xl: 1200,
    xxl: 1400,
};
export { breakpoints as default };
const getSortedBreakpoints = () => Object.entries(breakpoints)
    .filter((breakpoint) => !!breakpoint[0] // not an empty string
    &&
        (typeof (breakpoint[1]) === 'number') // is a number
)
    .sort((a, b) => a[1] - b[1]); // sort from smallest value to biggest one
/**
 * Gets the name of the next specified `breakpointName`.
 * @param breakpointName the name of the current breakpoint.
 * @returns the name of the next breakpoint, -or- `null` for the next biggest breakpoint.
 * @throws The specified `breakpointName` is not found in breakpoints.
 */
export const next = (breakpointName) => {
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
/**
 * Gets the minimum breakpoint width of the specified `breakpointName`.
 * @param breakpointName the breakpoint's name to get the minimum width.
 * @returns the minimum width of the specified `breakpointName`, -or- `null` for the smallest breakpoint.
 * @throws The specified `breakpointName` is not found in breakpoints.
 */
export const min = (breakpointName) => {
    const value = getSortedBreakpoints().find(([searchName]) => (searchName === breakpointName))?.[1];
    if (value === undefined)
        throw new Error(`Breakpoint '${breakpointName}' is not found in breakpoints.`);
    if (value === 0)
        return null;
    return value;
};
/**
 * Gets the maximum breakpoint width _before_ reaching the specified `breakpointName`.
 * @param breakpointName the breakpoint's name to get the maximum width.
 * @returns the maximum width of the specified `breakpointName`, -or- `null` for the smallest breakpoint.
 * @throws The specified `breakpointName` is not found in breakpoints.
 */
export const max = (breakpointName) => {
    const value = min(breakpointName);
    if (value === null)
        return null;
    if ((value >= 0.02))
        return (value - 0.02);
    return value;
};
/**
 * Returns `null` for the smallest breakpoint, otherwise returns the `breakpointName` with a dash in front.
 * @param breakpointName the breakpoint's name to get the infix.
 * @returns `-${breakpointName}` -or- `null` for the smallest breakpoint.
 * @throws The specified `breakpointName` is not found in breakpoints.
 */
export const infix = (breakpointName) => {
    if (min(breakpointName) === null)
        return null;
    return `-${breakpointName}`;
};
// rules:
/**
 * Applies given `styles` if the screen width is equal to / bigger than the specified `breakpointName`.
 * @param breakpointName the name of the minimum breakpoint.
 * @param styles the style(s) to apply if the screen width meets the minimum breakpoint width.
 * @returns A `Rule` object represents the media rule.
 * @throws The specified `breakpointName` is not found in breakpoints.
 */
export const isScreenWidthAtLeast = (breakpointName, styles) => {
    const minWidth = min(breakpointName);
    return rule((minWidth ? `@media (min-width: ${minWidth}px)` : null), styles);
};
/**
 * Applies given `styles` if the screen width is smaller than the specified `breakpointName`.
 * @param breakpointName the name of the maximum breakpoint.
 * @param styles the style(s) to apply if the screen width meets the maximum breakpoint width.
 * @returns A `Rule` object represents the media rule.
 * @throws The specified `breakpointName` is not found in breakpoints.
 */
export const isScreenWidthSmallerThan = (breakpointName, styles) => {
    const maxWidth = max(breakpointName);
    return rule((maxWidth ? `@media (max-width: ${maxWidth}px)` : null), styles);
};
/**
 * Applies given `styles` if the screen width is between the specified `lowerBreakpointName` and `upperBreakpointName`.
 * @param lowerBreakpointName the name of the minimum breakpoint.
 * @param upperBreakpointName the name of the maximum breakpoint.
 * @param styles the style(s) to apply if the screen width meets the minimum & maximum breakpoint width.
 * @returns A `Rule` object represents the media rule.
 * @throws The specified `lowerBreakpointName` or `upperBreakpointName` are not found in breakpoints.
 */
export const isScreenWidthBetween = (lowerBreakpointName, upperBreakpointName, styles) => {
    const minWidth = min(lowerBreakpointName);
    const maxWidth = max(upperBreakpointName);
    if (minWidth && maxWidth) {
        return rule(`@media (min-width: ${minWidth}px) and (max-width: ${maxWidth}px)`, styles);
    }
    else if (minWidth) {
        return rule(`@media (min-width: ${minWidth}px)`, styles);
    }
    else if (maxWidth) {
        return rule(`@media (max-width: ${maxWidth}px)`, styles);
    }
    else {
        return noRule(styles);
    } // if
};
/**
 * Applies given `styles` if the screen width is between the specified `breakpointName` and the next breakpoint.
 * @param breakpointName the name of the desired breakpoint.
 * @param styles the style(s) to apply if the screen width meets the minimum & maximum breakpoint width.
 * @returns A `Rule` object represents the media rule.
 * @throws The specified `breakpointName` is not found in breakpoints.
 */
export const isScreenWidth = (breakpointName, styles) => {
    const minWidth = min(breakpointName);
    const nextBp = next(breakpointName);
    const maxWidth = nextBp ? max(nextBp) : null;
    if (minWidth && maxWidth) {
        return rule(`@media (min-width: ${minWidth}px) and (max-width: ${maxWidth}px)`, styles);
    }
    else if (minWidth) {
        return rule(`@media (min-width: ${minWidth}px)`, styles);
    }
    else if (maxWidth) {
        return rule(`@media (max-width: ${maxWidth}px)`, styles);
    }
    else {
        return noRule(styles);
    } // if
};
