import { StyleCollection } from '@cssfn/cssfn';
export declare const breakpoints: {
    xs: number | null | undefined;
    sm: number | null | undefined;
    md: number | null | undefined;
    lg: number | null | undefined;
    xl: number | null | undefined;
    xxl: number | null | undefined;
};
export { breakpoints as default };
export declare type BreakpointName = (keyof typeof breakpoints) | (string & {});
/**
 * Gets the name of the next specified `breakpointName`.
 * @param breakpointName the name of the current breakpoint.
 * @returns the name of the next breakpoint, -or- `null` for the next biggest breakpoint.
 * @throws The specified `breakpointName` is not found in breakpoints.
 */
export declare const next: (breakpointName: BreakpointName) => BreakpointName | null;
/**
 * Gets the minimum breakpoint width of the specified `breakpointName`.
 * @param breakpointName the breakpoint's name to get the minimum width.
 * @returns the minimum width of the specified `breakpointName`, -or- `null` for the smallest breakpoint.
 * @throws The specified `breakpointName` is not found in breakpoints.
 */
export declare const min: (breakpointName: BreakpointName) => number | null;
/**
 * Gets the maximum breakpoint width _before_ reaching the specified `breakpointName`.
 * @param breakpointName the breakpoint's name to get the maximum width.
 * @returns the maximum width of the specified `breakpointName`, -or- `null` for the smallest breakpoint.
 * @throws The specified `breakpointName` is not found in breakpoints.
 */
export declare const max: (breakpointName: BreakpointName) => number | null;
/**
 * Returns `null` for the smallest breakpoint, otherwise returns the `breakpointName` with a dash in front.
 * @param breakpointName the breakpoint's name to get the infix.
 * @returns `-${breakpointName}` -or- `null` for the smallest breakpoint.
 * @throws The specified `breakpointName` is not found in breakpoints.
 */
export declare const infix: (breakpointName: BreakpointName) => `-${BreakpointName}` | null;
/**
 * Applies given `styles` if the screen width is equal to / bigger than the specified `breakpointName`.
 * @param breakpointName the name of the minimum breakpoint.
 * @param styles the style(s) to apply if the screen width meets the minimum breakpoint width.
 * @returns A `Rule` object represents the media rule.
 * @throws The specified `breakpointName` is not found in breakpoints.
 */
export declare const isScreenWidthAtLeast: (breakpointName: BreakpointName, styles: StyleCollection) => import("@cssfn/cssfn").Rule;
/**
 * Applies given `styles` if the screen width is smaller than the specified `breakpointName`.
 * @param breakpointName the name of the maximum breakpoint.
 * @param styles the style(s) to apply if the screen width meets the maximum breakpoint width.
 * @returns A `Rule` object represents the media rule.
 * @throws The specified `breakpointName` is not found in breakpoints.
 */
export declare const isScreenWidthSmallerThan: (breakpointName: BreakpointName, styles: StyleCollection) => import("@cssfn/cssfn").Rule;
/**
 * Applies given `styles` if the screen width is between the specified `lowerBreakpointName` and `upperBreakpointName`.
 * @param lowerBreakpointName the name of the minimum breakpoint.
 * @param upperBreakpointName the name of the maximum breakpoint.
 * @param styles the style(s) to apply if the screen width meets the minimum & maximum breakpoint width.
 * @returns A `Rule` object represents the media rule.
 * @throws The specified `lowerBreakpointName` or `upperBreakpointName` are not found in breakpoints.
 */
export declare const isScreenWidthBetween: (lowerBreakpointName: BreakpointName, upperBreakpointName: BreakpointName, styles: StyleCollection) => import("@cssfn/cssfn").Rule;
/**
 * Applies given `styles` if the screen width is between the specified `breakpointName` and the next breakpoint.
 * @param breakpointName the name of the desired breakpoint.
 * @param styles the style(s) to apply if the screen width meets the minimum & maximum breakpoint width.
 * @returns A `Rule` object represents the media rule.
 * @throws The specified `breakpointName` is not found in breakpoints.
 */
export declare const isScreenWidth: (breakpointName: BreakpointName, styles: StyleCollection) => import("@cssfn/cssfn").Rule;
