export default FullScreen;
declare function FullScreen({ appear, enter, name, xico, scrolling, page, children, className, style, ...restProps }: {
    [x: string]: any;
    appear?: string;
    enter?: string;
    name?: string;
    xico?: (props: any) => import("react/jsx-runtime").JSX.Element;
    scrolling?: boolean;
    page?: boolean;
    children: any;
    className: any;
    style: any;
}): import("react/jsx-runtime").JSX.Element;
