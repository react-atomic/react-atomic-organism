export const BEGIN: "0";
export const PER_PAGE_NUM: "perPageNum";
export const TOTAL: "total";
export const TOTAL_PAGE: "totalPage";
export const CURRENT_PAGE: "currentPage";
/**
 * @typedef {object} PageObject
 */
export default class paginationCalculator {
    /**
     * @param {PageObject=} props
     */
    constructor(props?: PageObject | undefined);
    props: any;
    /**
     * @param {string} key
     * @param {any} value
     */
    set(key: string, value: any): void;
    /**
     * @param {Page} page
     * @param {Page=} copyFrom
     */
    sync(page: Page, copyFrom?: Page | undefined): void;
    /**
     * @param {Page} page
     * @returns {Page}
     */
    calBegin(page: Page): Page;
    /**
     * @param {Page} page
     */
    calNav(page: Page): void;
    /**
     * @param {Page} page
     * @param {number} listNum
     * @returns {{[BEGIN]: number, [END]: number}}
     */
    calPageList(page: Page, listNum: number): {
        [BEGIN]: number;
        [END]: number;
    };
    fixedPageList({ page, pages, liCount, listNum }: {
        page: any;
        pages: any;
        liCount: any;
        listNum: any;
    }): any[];
    /**
     * @param {number} listNum
     * @param {Page=} page
     * @param {string=} url
     */
    genPageList(listNum: number, page?: Page | undefined, url?: string | undefined): {
        currentPageObject: Page;
    };
    /**
     * @param {Page} page
     * @param {Page=} copyFrom
     * @returns {Page}
     */
    process(page: Page, copyFrom?: Page | undefined): Page;
    /**
     * @param {any=} currentPage
     * @param {string=} url
     * @param {PaginationCalculator=} cal
     * @returns {Page}
     */
    getPage(currentPage?: any | undefined, url?: string | undefined, cal?: PaginationCalculator | undefined): Page;
}
export type PaginationCalculator = {
    process: Function;
    props: Record<string, any>;
};
export type PageObject = object;
/**
 * @typedef {object} PaginationCalculator
 * @property {Function} process
 * @property {Record<string,any>} props
 */
declare class Page {
    /**
     * @param {number=} currentPage
     * @param {string=} url
     * @param {PaginationCalculator=} cal
     */
    constructor(currentPage?: number | undefined, url?: string | undefined, cal?: PaginationCalculator | undefined);
    /**
     * @param {string} key
     * @param {any} value
     */
    set(key: string, value: any): void;
    /**
     * @type {number?}
     */
    "1": number | null;
    /**
     * @type {string?}
     */
    type: string | null;
    url: string;
    currentPage: number;
}
declare const END: "1";
export {};
