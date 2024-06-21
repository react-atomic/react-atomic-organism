/**
 * @interface
 */
export class SortData {
    /**
     * @type {?string=}
     */
    sortId: (string | null) | undefined;
    /**
     * @type {?string=}
     */
    targetId: (string | null) | undefined;
    /**
     * @type {?boolean=}
     */
    reverseOrder: (boolean | null) | undefined;
    /**
     * @type {?HTMLElement=}
     */
    targetEl: (HTMLElement | null) | undefined;
    /**
     * @type {?HTMLElement=}
     */
    sortEl: (HTMLElement | null) | undefined;
}
