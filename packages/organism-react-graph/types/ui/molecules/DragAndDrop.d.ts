export default DragAndDrop;
export type Component = import("reshow-build").Component;
export type OffsetType = import("getoffset").OffsetType;
export type PointType = {
    absX: number;
    absY: number;
    offset?: OffsetType | undefined;
};
export type DragAndDropProps = {
    builtInOnly?: boolean | undefined;
    renderFirst?: boolean | undefined;
    keepLastAbsXY?: boolean | undefined;
    component?: Component | undefined;
    style?: import("react").CSSProperties | undefined;
    dragAndDropStyle?: import("../../types").DragAndDropStyle | undefined;
    zoom?: import("../../types").SetZoom | undefined;
    refCb?: Function | undefined;
    onDragStart?: Function | undefined;
    onDrag?: Function | undefined;
    onDragEnd?: Function | undefined;
    onD3Load?: Function | undefined;
};
/**
 * @typedef {object} DragAndDropProps
 * @property {boolean=} builtInOnly
 * @property {boolean=} renderFirst
 * @property {boolean=} keepLastAbsXY
 * @property {Component=} component
 * @property {import("react").CSSProperties=} style
 * @property {import("../../types").DragAndDropStyle=} dragAndDropStyle
 * @property {import("../../types").SetZoom=} zoom
 * @property {Function=} refCb
 * @property {Function=} onDragStart
 * @property {Function=} onDrag
 * @property {Function=} onDragEnd
 * @property {Function=} onD3Load
 */
/**
 * @type React.ForwardRefExoticComponent<?, DragAndDropProps>
 */
declare const DragAndDrop: React.ForwardRefExoticComponent<unknown, DragAndDropProps>;
