export function Sort(props: SortableProps): import("react/jsx-runtime").JSX.Element;
export type SortData = import("../../types").SortData;
export type Coordinate = import("get-window-offset").Coordinate;
export type SetStateAction<T> = import("reshow-constant").SetStateAction<T>;
export type SortableProps = {
    setSortData?: SetStateAction<SortData> | undefined;
    fixedX?: boolean | undefined;
    fixedY?: boolean | undefined;
    builtInOnly?: boolean | undefined;
    renderFirst?: boolean | undefined;
    children?: React.ReactElement | undefined;
    style?: React.CSSProperties | undefined;
    activeStyle?: React.CSSProperties | undefined;
    activeFlotStyle?: React.CSSProperties | undefined;
    dragAndDropStyle?: import("organism-react-graph").DragAndDropStyle | undefined;
};
import * as React from "react";
