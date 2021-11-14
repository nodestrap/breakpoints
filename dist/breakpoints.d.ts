import { StyleCollection } from '@cssfn/cssfn';
export declare const breakpoints: {
    xs: number;
    sm: number;
    md: number;
    lg: number;
    xl: number;
    xxl: number;
};
export { breakpoints as default };
/**
 * Gets the name of the next specified `breakpointName`.
 * @param breakpointName the name of the current breakpoint.
 * @returns the name of the next breakpoint, -or- `null` for the next biggest breakpoint.
 * @throws The specified `breakpointName` is not found in breakpoints.
 */
export declare const next: (breakpointName: string) => string | null;
/**
 * Gets the minimum breakpoint width of the specified `breakpointName`.
 * @param breakpointName the breakpoint's name to get the minimum width.
 * @returns the minimum width of the specified `breakpointName`, -or- `null` for the smallest breakpoint.
 * @throws The specified `breakpointName` is not found in breakpoints.
 */
export declare const min: (breakpointName: string) => number | null;
/**
 * Gets the maximum breakpoint width _before_ reaching the specified `breakpointName`.
 * @param breakpointName the breakpoint's name to get the maximum width.
 * @returns the maximum width of the specified `breakpointName`, -or- `null` for the smallest breakpoint.
 * @throws The specified `breakpointName` is not found in breakpoints.
 */
export declare const max: (breakpointName: string) => number | null;
/**
 * Returns a blank string for the smallest breakpoint, otherwise returns the `breakpointName` with a dash in front.
 * @param breakpointName the breakpoint's name to get the infix.
 * @returns `-${breakpointName}` -or- `null` for the smallest breakpoint.
 * @throws The specified `breakpointName` is not found in breakpoints.
 */
export declare const infix: (breakpointName: string) => string | null;
/**
 * Applies given `styles` if the screen width is equal to / bigger than the specified `breakpointName`.
 * @param breakpointName the name of the minimum breakpoint.
 * @param styles the style(s) to apply if the screen width meets the minimum breakpoint width.
 * @returns A `RuleEntry` represents the media rule.
 * @throws The specified `breakpointName` is not found in breakpoints.
 */
export declare const isScreenWidthAtLeast: (breakpointName: string, styles: StyleCollection) => import("@cssfn/cssfn").RuleEntry;
/**
 * Applies given `styles` if the screen width is smaller than the specified `breakpointName`.
 * @param breakpointName the name of the maximum breakpoint.
 * @param styles the style(s) to apply if the screen width meets the maximum breakpoint width.
 * @returns A `RuleEntry` represents the media rule.
 * @throws The specified `breakpointName` is not found in breakpoints.
 */
export declare const isScreenWidthSmallerThan: (breakpointName: string, styles: StyleCollection) => import("@cssfn/cssfn").RuleEntry;
/**
 * Applies given `styles` if the screen width is between the specified `lowerBreakpointName` and `upperBreakpointName`.
 * @param lowerBreakpointName the name of the minimum breakpoint.
 * @param upperBreakpointName the name of the maximum breakpoint.
 * @param styles the style(s) to apply if the screen width meets the minimum & maximum breakpoint width.
 * @returns A `RuleEntry` represents the media rule.
 * @throws The specified `lowerBreakpointName` or `upperBreakpointName` are not found in breakpoints.
 */
export declare const isScreenWidthBetween: (lowerBreakpointName: string, upperBreakpointName: string, styles: StyleCollection) => import("@cssfn/cssfn").RuleEntry;
/**
 * Applies given `styles` if the screen width is between the specified `breakpointName` and the next breakpoint.
 * @param breakpointName the name of the desired breakpoint.
 * @param styles the style(s) to apply if the screen width meets the minimum & maximum breakpoint width.
 * @returns A `RuleEntry` represents the media rule.
 * @throws The specified `breakpointName` is not found in breakpoints.
 */
export declare const isScreenWidth: (breakpointName: string, styles: StyleCollection) => import("@cssfn/cssfn").RuleEntry;
