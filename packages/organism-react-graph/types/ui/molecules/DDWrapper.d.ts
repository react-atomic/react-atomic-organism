export function useDDWrapper(props: DDWrapper): {
    handler: {
        drag: (e: any) => void;
        dragEnd: (e: any) => void;
    };
    absX: number;
    absY: number;
    startPoint: StartPointInfo;
    isDraging: boolean;
};
export default DDWrapper;
export type DDWrapper = {
    builtInOnly?: boolean | undefined;
    renderFirst?: boolean | undefined;
    dragAndDropStyle: import("../../types").DragAndDropStyle;
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
import { StartPointInfo } from "../../types";
declare function DDWrapper(props: DDWrapper): import("react/jsx-runtime").JSX.Element;
import * as React from "react";
