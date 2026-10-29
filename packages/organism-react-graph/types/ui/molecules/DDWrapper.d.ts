import * as React from "react";
import { StartPointInfo } from "../../types";
export type DDWrapper = {
    builtInOnly?: boolean | undefined;
    renderFirst?: boolean | undefined;
    dragAndDropStyle?: import("../../types").DragAndDropStyle | undefined;
    fixedX?: boolean | undefined;
    fixedY?: boolean | undefined;
    minX?: number | undefined;
    maxX?: number | undefined;
    minY?: number | undefined;
    maxY?: number | undefined;
    startPoint?: StartPointInfo | undefined;
    onDrag?: Function | undefined;
    onDragEnd?: Function | undefined;
    refCb?: Function | undefined;
    children?: any | undefined;
    style?: React.CSSProperties | undefined;
};
/**
 * @typedef {object} DDWrapper
 * @property {boolean=} builtInOnly
 * @property {boolean=} renderFirst
 * @property {import("../../types").DragAndDropStyle=} dragAndDropStyle
 * @property {boolean=} fixedX
 * @property {boolean=} fixedY
 * @property {number=} minX
 * @property {number=} maxX
 * @property {number=} minY
 * @property {number=} maxY
 * @property {StartPointInfo=} startPoint
 * @property {Function=} onDrag
 * @property {Function=} onDragEnd
 * @property {Function=} refCb
 * @property {any=} children
 * @property {React.CSSProperties=} style
 */
export declare const useDDWrapper: (props: DDWrapper) => {
    handler: {
        drag: (/**@type any*/ e: any) => void;
        dragEnd: (/**@type any*/ e: any) => void;
    };
    absX: number;
    absY: number;
    startPoint: StartPointInfo;
    isDraging: boolean;
};
declare const DDWrapper: (/**@type DDWrapper*/ props: DDWrapper) => React.JSX.Element;
export default DDWrapper;
