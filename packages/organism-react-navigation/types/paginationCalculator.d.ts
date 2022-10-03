export default paginationCalculator;
declare class paginationCalculator {
    constructor(props: any);
    props: any;
    set(key: any, value: any): void;
    sync(page: any, copyFrom: any): void;
    calBegin(page: any): any;
    calNav(page: any): void;
    calPageList(page: any, num: any): {
        0: number;
        1: number;
    };
    fixedPageList({ page, pages, liCount, num }: {
        page: any;
        pages: any;
        liCount: any;
        num: any;
    }): any[];
    genPageList(num: any, page: any, url: any): {
        currentPage: any;
    };
    process(page: any, copyFrom: any): any;
    getPage(currentPage: any, url: any, cal: any): Page;
}
export const TOTAL: "total";
export const TOTAL_PAGE: "totalPage";
export const CURRENT_PAGE: "currentPage";
export const BEGIN: "0";
export const PER_PAGE_NUM: "perPageNum";
declare class Page {
    constructor(currentPage: any, url: any, cal: any);
    set(key: any, value: any): void;
    0: any;
    1: any;
    perPageNum: any;
    total: any;
    totalPage: any;
    currentPage: any;
    type: any;
    url: any;
    backward: any;
    forward: any;
    firstPage: any;
    lastPage: any;
}
