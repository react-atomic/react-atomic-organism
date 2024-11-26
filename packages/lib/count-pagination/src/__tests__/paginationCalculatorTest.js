// @ts-check
import { expect } from "chai";

import paginationCalculator, { options } from "../index";
const { BEGIN, END, PER_PAGE_NUM, TOTAL } = options;

describe("Test Pagination Calculator", () => {
  it("basic test", () => {
    const pg = new paginationCalculator();
    pg.set(TOTAL, 500);
    pg.set(PER_PAGE_NUM, 10);
    const pgList = pg.genPageList(10);
    // console.dir(pgList.pageList, {depth: null});
    // console.dir(pgList.navigate, {depth: null});
    expect(pgList).have.keys(["navigate", "pageList"]);
    expect(pgList.navigate).have.keys(["currentPage", "lastPage"]);
  });

  it("calPageList test", () => {
    const pg = new paginationCalculator();
    const page = pg.getPage();
    page.begin = 1;
    const liCount = pg.calPageList(page, 3);
    expect(liCount).to.deep.equal({ [BEGIN]: 1, [END]: 1 });
  });

  it("calPageList with small data", () => {
    const pg = new paginationCalculator();
    pg.set(TOTAL, 20);
    pg.set(PER_PAGE_NUM, 10);
    const pgList1 = pg.genPageList(10);
    expect(pgList1.pageList[0].navigate).to.equal("currentPage");
    expect(pgList1.pageList[1]).to.include({ [BEGIN]: 10, [END]: 19 });
    pg.set(BEGIN, 10);
    const pgList2 = pg.genPageList(10);
    expect(pgList2.pageList[1].navigate).to.equal("currentPage");
    expect(pgList2.pageList[0]).to.include({ [BEGIN]: 0, [END]: 9 });
  });

  it("test calculate first page with type=page", () => {
    const pg = new paginationCalculator();
    const page = pg.getPage();
    page.perPageNum = 10;
    pg.process(page);
    expect(page).to.include({
      [BEGIN]: 0,
      [END]: 0,
      currentPage: 1,
      type: "page",
    });
  });
});
