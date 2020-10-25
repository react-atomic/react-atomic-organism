import get from "get-object-value";
import { toInt } from "to-percent-js";

const keys = Object.keys;

const BEGIN = "0";
const END = "1";
const PER_PAGE_NUM = "perPageNum";
const TOTAL = "total";
const TOTAL_PAGE = "totalPage";
const CURRENT_PAGE = "currentPage";
const BACKWARD = "backward";
const FORWARD = "forward";
const LAST_PAGE = "lastPage";
const FIRST_PAGE = "firstPage";

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

class Page {
  constructor(currentPage, url, cal) {
    this[BEGIN] = null;
    this[END] = null;
    this[PER_PAGE_NUM] = null;
    this[TOTAL] = null;
    this[TOTAL_PAGE] = null;
    this[CURRENT_PAGE] = null;
    this[TYPE] = null;
    this[URL] = url || null;
    //nav
    this[BACKWARD] = null;
    this[FORWARD] = null;
    this[FIRST_PAGE] = null;
    this[LAST_PAGE] = null;
    if (null != currentPage) {
      // force use type with page. need let currentPage have value and begin keep null
      this[CURRENT_PAGE] = currentPage;
      cal.process(this, { ...cal.props, [BEGIN]: null });
    }
  }

  set(key, value) {
    this[key] = value;
  }
}

class paginationCalculator {
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

  set(key, value) {
    this.props[key] = value;
  }

  sync(page, copyFrom) {
    const syncKeys = [PER_PAGE_NUM, TOTAL, CURRENT_PAGE, BEGIN];
    syncKeys.forEach((key) => {
      if (null != copyFrom[key] && null == page[key]) {
        page.set(key, copyFrom[key]);
      }
    });
  }

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

  calNav(page) {
    if (1 !== page[CURRENT_PAGE]) {
      page[BACKWARD] = page[CURRENT_PAGE] - 1;
      page[FIRST_PAGE] = 1;
    }
    if (page[TOTAL_PAGE] > page[CURRENT_PAGE]) {
      page[FORWARD] = page[CURRENT_PAGE] + 1;
      page[LAST_PAGE] = page[TOTAL_PAGE];
    }
  }

  calPageList(page, num) {
    if (num < 2) {
      console.error(
        `Page list number need greater than 2, You set to [${num}].`
      );
      return;
    }
    const middle = Math.floor(num / 2);
    let begin = page[CURRENT_PAGE] - middle;
    if (begin <= 0) {
      begin = 1;
    }
    if (num % 2 === 0) {
      begin++;
    }
    let end = begin + num - 1;
    if (end > page[TOTAL_PAGE]) {
      end = toInt(page[TOTAL_PAGE]) || 1;
    }
    if (end - begin < num - 1) {
      begin = end - num + 1;
      if (begin <= 0) {
        begin = 1;
      }
    }
    return { [BEGIN]: begin, [END]: end };
  }

  fixedPageList({ page, pages, liCount, num }) {
    const list = keys(pages).map((key) => pages[key]);
    if (num >= liCount[END]) {
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

  genPageList(num, page, url) {
    if (isNaN(num) || !num) {
      num = 10;
    }
    if (null == page) {
      page = this.process(this.getPage());
    }
    this.calNav(page);
    const result = {
      [CURRENT_PAGE]: page,
    };
    const pages = {};
    const current = page[CURRENT_PAGE];
    const liCount = this.calPageList(page, num);
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
          result[FIRST_PAGE] = firstPage;
        }
      }
    }
    if (page[FORWARD]) {
      result[CURRENT_PAGE][FORWARD] = this.getPage(page[FORWARD], url, this);
    }
    if (page[BACKWARD]) {
      result[CURRENT_PAGE][BACKWARD] = this.getPage(page[BACKWARD], url, this);
    }
    if (page && page[LAST_PAGE] && null == pages[page[LAST_PAGE]]) {
      const lastPage = this.getPage(page[LAST_PAGE], url, this);
      if (liCount[END] === page[LAST_PAGE]) {
        pages[liCount[END]] = lastPage;
      } else {
        result[LAST_PAGE] = lastPage;
      }
    }
    result.list = this.fixedPageList({ page, pages, num, liCount });
    return result;
  }

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

  getPage(currentPage, url, cal) {
    return new Page(currentPage, url, cal);
  }
}

export default paginationCalculator;
export { TOTAL, TOTAL_PAGE, CURRENT_PAGE, BEGIN, PER_PAGE_NUM };
