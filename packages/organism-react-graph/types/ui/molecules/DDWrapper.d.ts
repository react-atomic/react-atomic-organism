export function useDDWrapper(props: DDWrapper): {
    handler: {
        drag: (e: any) => void;
        dragEnd: (e: any) => void;
    };
    absX: any;
    absY: any;
    startPoint: any;
    isDraging: any;
};
export default DDWrapper;
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
declare function DDWrapper(props: DDWrapper): any;
import { StartPointInfo } from "../../types";
