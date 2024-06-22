/**
 * @interface
 */
export class SortData {
  /**
   * @type {?string|number=}
   */
  sortId;

  /**
   * @type {?string|number=}
   */
  targetId;

  /**
   * @type {?boolean=}
   */
  reverseOrder;

  /**
   * @type {?HTMLElement=}
   */
  targetEl;

  /**
   * @type {?HTMLElement=}
   */
  sortEl;

  /**
   * @type {boolean}
   */
  isDraging;
}
