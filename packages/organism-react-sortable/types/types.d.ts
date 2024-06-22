/**
 * @interface
 */
export class SortData {
    /**
     * @type {?string|number=}
     */
    sortId: ((string | number) | null) | undefined;
    /**
     * @type {?string|number=}
     */
    targetId: ((string | number) | null) | undefined;
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
    /**
     * @type {boolean}
     */
    isDraging: boolean;
}
