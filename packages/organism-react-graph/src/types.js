// @ts-check

/**
 * @interface
 */
export class StartPointInfo {
  /**
   * @type number
   */
  elStartX;

  /**
   * @type number
   */
  elStartY;
}

/**
 * @interface
 */
export class Zoom {
  /**
   * @type number
   */
  k;
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
  droppable;
  /**
   * @type {?React.CSSProperties=}
   */
  dragging;
}



/**
 * @typedef {Zoom|function():Zoom} SetZoom
 */
