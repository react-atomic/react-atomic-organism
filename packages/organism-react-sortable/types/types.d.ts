/**
 * @interface
 */
export declare class SortData {
    /**
     * @type {?string|number=}
     */
    sortId: ((string | null) | number) | undefined;
    /**
     * @type {?string|number=}
     */
    targetId: ((string | null) | number) | undefined;
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
