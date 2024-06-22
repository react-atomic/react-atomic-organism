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
 * @typedef {import("react")} React
 */
/**
 * @interface
 */
export class DragAndDropStyle {
    /**
     * @type {React.CSSProperties}
     */
    droppable: React.CSSProperties;
    /**
     * @type {?React.CSSProperties=}
     */
    dragging: (React.CSSProperties | null) | undefined;
}
export type React = typeof import("react");
export type SetZoom = Zoom | (() => Zoom);
