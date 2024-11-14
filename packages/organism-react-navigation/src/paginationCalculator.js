// @ts-check
import get from "get-object-value";
import { toInt } from "to-percent-js";

const keys = Object.keys;

export const BEGIN = "0";
export const PER_PAGE_NUM = "perPageNum";
export const TOTAL = "total";
export const TOTAL_PAGE = "totalPage";
export const CURRENT_PAGE = "currentPage";
const CURRENT_PAGE_OBJECT = "currentPageObject";
const END = "1";
const BACKWARD_PAGE = "backwardPage";
const FORWARD_PAGE = "forwardPage";
const BACKWARD_PAGE_OBJECT = "backwardPageObject";
const FORWARD_PAGE_OBJECT = "forwardPageObject";
const LAST_PAGE = "lastPage";
const FIRST_PAGE = "firstPage";
const FIRST_PAGE_OBJECT = "firstPageObject";
const LAST_PAGE_OBJECT = "lastPageObject";

/**
 * type: [begin|page]
 */
const TYPE = "type";
const TYPE_BEGIN = "begin";
const TYPE_PAGE = "page";

// url
const URL = "url";
const QUERY_B = "b";
const QUERY_PAGE = "page";

/**
 * @typedef {object} PaginationCalculator
 * @property {Function} process
 * @property {Record<string,any>} props
 */

class Page {
  /**
   * @param {number=} currentPage
   * @param {string=} url
   * @param {PaginationCalculator=} cal
   */
  constructor(currentPage, url, cal) {
    // sync keys
    /**
     * @type {number?}
     * will sync need keep null
     */
    this[BEGIN];
    /**
     * @type {number}
     * will sync need keep null
     */
    this[PER_PAGE_NUM];
    /**
     * @type {number}
     * will sync need keep null
     */
    this[TOTAL];
    /**
     * @type {number}
     * will sync need keep null
     */
    this[CURRENT_PAGE];

    // non-sync keys
    /**
     * @type {number?}
     */
    this[END] = null;
    /**
     * @type {number}
     */
    this[TOTAL_PAGE];
    /**
     * @type {string?}
     */
    this[TYPE] = null;
    this[URL] = url || null;
    if (null != currentPage) {
      // force use type with page. need let currentPage have value and begin keep null
      this[CURRENT_PAGE] = currentPage;
      cal?.process(this, { ...cal.props, [BEGIN]: null });
    }
  }

  /**
   * @param {string} key
   * @param {any} value
   */
  set(key, value) {
    this[key] = value;
  }
}

/**
 * @typedef {object} PageObject
 */

export default class paginationCalculator {
  /**
   * @param {PageObject=} props
   */
  constructor(props) {
    props = {
      [TOTAL]: 0,
      query: {
        [QUERY_B]: QUERY_B,
        [QUERY_PAGE]: QUERY_PAGE,
      },
      ...props,
    };
    this.props = props;
  }

  /**
   * @param {string} key
   * @param {any} value
   */
  set(key, value) {
    this.props[key] = value;
  }

  /**
   * @param {Page} page
   * @param {Page=} copyFrom
   */
  sync(page, copyFrom) {
    const syncKeys = [PER_PAGE_NUM, TOTAL, CURRENT_PAGE, BEGIN];
    if (null != copyFrom) {
      syncKeys.forEach((key) => {
        if (null != copyFrom[key] && null == page[key]) {
          page.set(key, copyFrom[key]);
        }
      });
    }
  }

  /**
   * @param {Page} page
   * @returns {Page}
   */
  calBegin(page) {
    page[TOTAL_PAGE] = Math.ceil(page[TOTAL] / page[PER_PAGE_NUM]);
    if (isNaN(page[TOTAL_PAGE]) || 1 > page[TOTAL_PAGE]) {
      page[TOTAL_PAGE] = 1;
    }
    if (!page[CURRENT_PAGE] || 1 > page[CURRENT_PAGE]) {
      page[CURRENT_PAGE] = 1;
    }
    if (page[CURRENT_PAGE] > page[TOTAL_PAGE]) {
      page[CURRENT_PAGE] = page[TOTAL_PAGE];
    }
    page[BEGIN] = (page[CURRENT_PAGE] - 1) * page[PER_PAGE_NUM];
    page[END] = page[BEGIN] + page[PER_PAGE_NUM] - 1;
    const fixTotal = () => (page[TOTAL] ? page[TOTAL] - 1 : 0);
    if (page[BEGIN] >= page[TOTAL]) {
      page[BEGIN] = fixTotal();
    }
    if (page[END] >= page[TOTAL]) {
      page[END] = fixTotal();
    }
    return page;
  }

  /**
   * @param {Page} page
   */
  calNav(page) {
    if (1 !== page[CURRENT_PAGE]) {
      page[BACKWARD_PAGE] = page[CURRENT_PAGE] - 1;
      page[FIRST_PAGE] = 1;
    }
    if (page[TOTAL_PAGE] > page[CURRENT_PAGE]) {
      page[FORWARD_PAGE] = page[CURRENT_PAGE] + 1;
      page[LAST_PAGE] = page[TOTAL_PAGE];
    }
  }

  /**
   * @param {Page} page
   * @param {number} listNum
   * @returns {{[BEGIN]: number, [END]: number}}
   */
  calPageList(page, listNum) {
    if (listNum < 2) {
      console.error(
        `Page list number need greater than 2, You set to [${listNum}].`
      );
      return { [BEGIN]: 0, [END]: 0 };
    }
    const middle = Math.floor(listNum / 2);
    page[CURRENT_PAGE] = page[CURRENT_PAGE] ?? 1;
    let begin = page[CURRENT_PAGE] - middle;
    if (begin <= 0) {
      begin = 1;
    }
    if (listNum % 2 === 0) {
      begin++;
    }
    let end = begin + listNum - 1;
    if (end > page[TOTAL_PAGE] || !page[TOTAL_PAGE]) {
      end = toInt(page[TOTAL_PAGE]) || 1;
    }
    if (end - begin < listNum - 1) {
      begin = end - listNum + 1;
      if (begin <= 0) {
        begin = 1;
      }
    }
    return { [BEGIN]: begin, [END]: end };
  }

  fixedPageList({ page, pages, liCount, listNum }) {
    const list = keys(pages).map((key) => pages[key]);
    if (listNum >= liCount[END]) {
      return list;
    }
    const lastKey = list.length - 1;
    let start = 0;
    let end = undefined;
    if (page[LAST_PAGE]) {
      end = -3;
    }
    if (page[FIRST_PAGE] && liCount[BEGIN] > 2) {
      start = 2;
      end = -2;
    }

    if (
      list[lastKey][CURRENT_PAGE] === page[LAST_PAGE] ||
      list[lastKey] === CURRENT_PAGE
    ) {
      end = undefined;
    }
    return list.slice(start, end);
  }

  /**
   * @param {number} listNum
   * @param {Page=} page
   * @param {string=} url
   */
  genPageList(listNum, page, url) {
    if (isNaN(listNum) || !listNum) {
      listNum = 10;
    }
    if (null == page) {
      page = this.process(this.getPage());
    }
    this.calNav(page);
    const result = {
      [CURRENT_PAGE_OBJECT]: page,
    };
    const pages = {};
    const current = page[CURRENT_PAGE];
    const liCount = this.calPageList(page, listNum);
    pages[current] = CURRENT_PAGE; // this line can not inside foreach, licount may not contain current

    for (let i = liCount[BEGIN], j = liCount[END]; i <= j; i++) {
      if (i !== current) {
        pages[i] = this.getPage(i, url, this);
      }
    }
    if (page[FIRST_PAGE]) {
      if (get(liCount, [BEGIN], -1) > page[FIRST_PAGE]) {
        const firstPage = this.getPage(page[FIRST_PAGE], url, this);
        if (2 === liCount[BEGIN]) {
          // index 1 is mean first page
          pages[1] = firstPage;
        } else {
          result[FIRST_PAGE_OBJECT] = firstPage;
        }
      }
    }
    if (page[FORWARD_PAGE]) {
      result[CURRENT_PAGE_OBJECT][FORWARD_PAGE_OBJECT] = this.getPage(
        page[FORWARD_PAGE],
        url,
        this
      );
    }
    if (page[BACKWARD_PAGE]) {
      result[CURRENT_PAGE_OBJECT][BACKWARD_PAGE_OBJECT] = this.getPage(
        page[BACKWARD_PAGE],
        url,
        this
      );
    }
    if (page && page[LAST_PAGE] && null == pages[page[LAST_PAGE]]) {
      const lastPage = this.getPage(page[LAST_PAGE], url, this);
      if (liCount[END] === page[LAST_PAGE]) {
        pages[liCount[END]] = lastPage;
      } else {
        result[LAST_PAGE_OBJECT] = lastPage;
      }
    }
    result.list = this.fixedPageList({ page, pages, listNum, liCount });
    return result;
  }

  /**
   * @param {Page} page
   * @param {Page=} copyFrom
   * @returns {Page}
   */
  process(page, copyFrom) {
    if (null == page) {
      page = this.process(this.getPage());
    }
    if (null == copyFrom) {
      copyFrom = this.props;
    }
    this.sync(page, copyFrom);
    if (!page[PER_PAGE_NUM]) {
      console.error(`Per page number can't set to empty.`);
    }
    if (null != page[BEGIN]) {
      page[CURRENT_PAGE] = Math.floor(page[BEGIN] / page[PER_PAGE_NUM]) + 1;
      page[TYPE] = TYPE_BEGIN;
    } else if (null != page[CURRENT_PAGE]) {
      page[TYPE] = TYPE_PAGE;
    } else {
      page[CURRENT_PAGE] = 1;
      page[TYPE] = TYPE_PAGE;
    }
    return this.calBegin(page);
  }

  /**
   * @param {any=} currentPage
   * @param {string=} url
   * @param {PaginationCalculator=} cal
   * @returns {Page}
   */
  getPage(currentPage, url, cal) {
    return new Page(currentPage, url, cal);
  }
}
