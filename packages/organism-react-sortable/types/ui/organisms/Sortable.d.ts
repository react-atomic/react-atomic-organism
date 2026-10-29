import * as React from "react";
export type SortData = import("../../types").SortData;
export type Coordinate = import("get-window-offset").Coordinate;
export type SetStateAction<T> = import("reshow-constant").SetStateAction<T>;
export type SortableProps = {
    setSortData?: React.Dispatch<React.SetStateAction<SortData>> | undefined;
    fixedX?: boolean | undefined;
    fixedY?: boolean | undefined;
    autoSelect?: boolean | undefined;
    builtInOnly?: boolean | undefined;
    renderFirst?: boolean | undefined;
    children?: React.ReactElement | undefined;
    style?: React.CSSProperties | undefined;
    activeStyle?: React.CSSProperties | undefined;
    activeFlotStyle?: React.CSSProperties | undefined;
    dragAndDropStyle?: import("organism-react-graph").DragAndDropStyle | undefined;
};
/**
 * @typedef {object} SortableProps
 * @property {React.Dispatch<React.SetStateAction<SortData>>=} setSortData
 * @property {boolean=} fixedX
 * @property {boolean=} fixedY
 * @property {boolean=} autoSelect
 * @property {boolean=} builtInOnly
 * @property {boolean=} renderFirst
 * @property {React.ReactElement=} children
 * @property {React.CSSProperties=} style
 * @property {React.CSSProperties=} activeStyle
 * @property {React.CSSProperties=} activeFlotStyle
 * @property {import("organism-react-graph").DragAndDropStyle=} dragAndDropStyle
 */
export declare const Sort: (/**@type SortableProps*/ props: SortableProps) => React.JSX.Element;
