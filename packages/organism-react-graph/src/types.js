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
 * @interface
 */
export class DragAndDropStyle {
  /**
   * @type {import("react").CSSProperties}
   */
  droppable;
  /**
   * @type {?import("react").CSSProperties=}
   */
  dragging;
}



/**
 * @typedef {Zoom|function():Zoom} SetZoom
 */
