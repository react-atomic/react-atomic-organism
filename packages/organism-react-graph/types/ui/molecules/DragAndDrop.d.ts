export default DragAndDrop;
export type OffsetType = import("getoffset").OffsetType;
export type PointType = {
    absX: number;
    absY: number;
    offset?: OffsetType | undefined;
};
export type DragAndDropProps = object;
/**
 * @typedef {object} DragAndDropProps
 */
/**
 * @type React.ForwardRefExoticComponent<?, DragAndDropProps>
 */
declare const DragAndDrop: React.ForwardRefExoticComponent<unknown, DragAndDropProps>;
