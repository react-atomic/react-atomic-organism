export namespace options {
    export { BEGIN };
    export { END };
    export { TOTAL };
    export { PER_PAGE_NUM };
    export { CURRENT_PAGE };
    export { BACKWARD_PAGE };
    export { FORWARD_PAGE };
}
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
    sync(page: {
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
    }, copyFrom?: {
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
    } | undefined): void;
    /**
     * @param {Page} page
     * @returns {Page}
     */
    calBegin(page: {
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
    }): {
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
    /**
     * @param {Page} page
     */
    calNav(page: {
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
    }): void;
    /**
     * @param {Page} page
     * @param {number} listNum
     * @returns {{[BEGIN]: number, [END]: number}}
     */
    calPageList(page: {
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
    }, listNum: number): {
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
    }): {
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
    }[];
    /**
     * @param {number} listNum
     * @param {Page=} page
     * @param {string=} url
     * @returns {PageListTS}
     */
    genPageList(listNum: number, page?: {
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
    } | undefined, url?: string | undefined): PageListTS;
    /**
     * @param {Page} page
     * @param {Page=} copyFrom
     * @returns {Page}
     */
    process(page: {
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
    }, copyFrom?: {
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
    } | undefined): {
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
    /**
     * @param {any=} currentPage
     * @param {string=} url
     * @param {PaginationCalculator=} cal
     * @returns {Page}
     */
    getPage(currentPage?: any | undefined, url?: string | undefined, cal?: PaginationCalculator | undefined): {
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
}
export type NavigateTS = {
    currentPage?: {
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
    } | undefined;
    firstPage?: {
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
    } | undefined;
    lastPage?: {
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
    } | undefined;
};
export type PageListTS = {
    pageList: {
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
    }[];
    navigate: NavigateTS;
};
export type PaginationCalculator = {
    process: Function;
    props: Record<string, any>;
};
export type PageObject = object;
declare const BEGIN: "begin";
declare const END: "end";
declare const TOTAL: "total";
declare const PER_PAGE_NUM: "perPageNum";
declare const CURRENT_PAGE: "currentPage";
declare const BACKWARD_PAGE: "backwardPage";
declare const FORWARD_PAGE: "forwardPage";
export {};
