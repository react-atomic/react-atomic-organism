import React from "react";
/**
 * @param {{
 *   appear?: string,
 *   enter?: string,
 *   name?: string,
 *   xico?: (props: any) => any,
 *   scrolling?: boolean,
 *   page?: boolean,
 *   children?: any,
 *   className?: string,
 *   style?: any,
 *   [key: string]: any
 * }} props
 */
declare const FullScreen: ({ appear, enter, name, xico, scrolling, page, children, className, style, ...restProps }: {
    appear?: string;
    enter?: string;
    name?: string;
    xico?: (props: any) => any;
    scrolling?: boolean;
    page?: boolean;
    children?: any;
    className?: string;
    style?: any;
    [key: string]: any;
}) => React.JSX.Element;
export default FullScreen;
