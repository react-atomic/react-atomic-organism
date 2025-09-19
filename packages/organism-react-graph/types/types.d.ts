/**
 * @interface
 */
export class StartPointInfo {
    /**
     * @type number
     */
    elStartX: number;
    /**
     * @type number
     */
    elStartY: number;
}
/**
 * @interface
 */
export class Zoom {
    /**
     * @type number
     */
    k: number;
}
/**
 * @interface
 */
export class DragAndDropStyle {
    /**
     * @type {import("react").CSSProperties}
     */
    droppable: any;
    /**
     * @type {?import("react").CSSProperties=}
     */
    dragging: (any | null) | undefined;
}
export type SetZoom = Zoom | (() => Zoom);
