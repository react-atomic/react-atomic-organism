export default ScrollAnimate;
declare function ScrollAnimate({ monitorScroll, container, ...others }: {
    [x: string]: any;
    monitorScroll?: boolean;
    container?: (props: any) => any;
}): any;
