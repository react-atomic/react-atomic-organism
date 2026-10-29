/**
 * @interface
 */
export declare class StartPointInfo {
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
export declare class Zoom {
    /**
     * @type number
     */
    k: number;
}
/**
 * @interface
 */
export declare class DragAndDropStyle {
    /**
     * @type {import("react").CSSProperties}
     */
    droppable: import("react").CSSProperties;
    /**
     * @type {?import("react").CSSProperties=}
     */
    dragging: (import("react").CSSProperties | null) | undefined;
}
export type SetZoom = Zoom | (() => Zoom);
/**
 * @typedef {Zoom|(() => Zoom)} SetZoom
 */
