export const BEGIN: "begin";
export const END: "end";
export const PER_PAGE_NUM: "perPageNum";
export const TOTAL: "total";
export const TOTAL_PAGE: "totalPage";
export const CURRENT_PAGE: "currentPage";
export const BACKWARD_PAGE: "backwardPage";
export const FORWARD_PAGE: "forwardPage";
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
    /**
     * @returns {Page[]}
     */
    fixedPageList({ page, pages, liCount, listNum }: {
        page: any;
        pages: any;
        liCount: any;
        listNum: any;
    }): Page[];
    /**
     * @typedef {object} NavigateTS
     * @property {Page=} currentPage
     * @property {Page=} firstPage
     * @property {Page=} lastPage
     */
    /**
     * @typedef {object} PageListTS
     * @property {Page[]} pageList
     * @property {NavigateTS} navigate
     */
    /**
     * @param {number} listNum
     * @param {Page=} page
     * @param {string=} url
     * @returns {PageListTS}
     */
    genPageList(listNum: number, page?: Page | undefined, url?: string | undefined): {
        pageList: Page[];
        navigate: {
            currentPage?: Page | undefined;
            firstPage?: Page | undefined;
            lastPage?: Page | undefined;
        };
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
     * @type {string}
     */
    navigate: string;
    /**
     * @type {number?}
     * will sync need keep null
     */
    begin: number | null;
    /**
     * @type {number}
     * will sync need keep null
     */
    perPageNum: number;
    /**
     * @type {number?}
     */
    end: number | null;
    /**
     * @type {string?}
     */
    type: string | null;
    /**
     * @type {string?}
     */
    url: string | null;
    currentPage: number;
}
export {};
