declare const BEGIN = "begin";
declare const END = "end";
export declare const options: {
    BEGIN: string;
    END: string;
    TOTAL: string;
    PER_PAGE_NUM: string;
    CURRENT_PAGE: string;
    BACKWARD_PAGE: string;
    FORWARD_PAGE: string;
};
export type NavigateTS = {
    currentPage?: Page | undefined;
    firstPage?: Page | undefined;
    lastPage?: Page | undefined;
};
export type PageListTS = {
    pageList: Page[];
    navigate: NavigateTS;
};
export type PaginationCalculator = {
    process: Function;
    props: Record<string, any>;
};
export type Page = typeof Page;
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
 * @typedef {object} PaginationCalculator
 * @property {Function} process
 * @property {Record<string,any>} props
 */
/**
 * @typedef {typeof Page} Page
 */
declare const Page: {
    /**
     * @type {number?}
     * will sync need keep null
     */
    begin: number | null;
    /**
     * @type {number?}
     * will sync need keep null
     */
    perPageNum: number | null;
    /**
     * @type {number?}
     * will sync need keep null
     */
    total: number | null;
    /**
     * @type {number?}
     * will sync need keep null
     */
    currentPage: number | null;
    /**
     * @type {string}
     */
    navigate: string;
    /**
     * @type {number}
     */
    end: number;
    /**
     * @type {number}
     */
    totalPage: number;
    /**
     * @type {string?}
     */
    type: string | null;
    /**
     * @type {string?}
     */
    url: string | null;
};
export type PageObject = object;
/**
 * @typedef {object} PageObject
 */
export default class paginationCalculator {
    props: object;
    /**
     * @param {PageObject=} props
     */
    constructor(props?: PageObject | undefined);
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
        liCount: any;
        listNum: any;
        page: any;
        pages: any;
    }): Page[];
    /**
     * @param {number} listNum
     * @param {Page=} page
     * @param {string=} url
     * @returns {PageListTS}
     */
    genPageList(listNum: number, page?: Page | undefined, url?: string | undefined): PageListTS;
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
export {};
