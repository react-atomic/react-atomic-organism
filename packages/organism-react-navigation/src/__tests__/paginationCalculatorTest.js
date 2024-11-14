// @ts-check
import { expect } from "chai";

import paginationCalculator, {
  BEGIN,
  PER_PAGE_NUM,
  TOTAL,
} from "../paginationCalculator";

describe("Test Pagination Calculator", () => {
  it("basic test", () => {
    const pg = new paginationCalculator();
    pg.set(TOTAL, 500);
    pg.set(PER_PAGE_NUM, 10);
    const pgList = pg.genPageList(10);
    expect(pgList).have.keys(["currentPageObject", "lastPageObject", "list"])
    // console.dir(pgList.list, {depth: null});
  });

  it("calPageList test", () => {
    const pg = new paginationCalculator();
    const page = pg.getPage();
    page.set(BEGIN, 1);
    const liCount = pg.calPageList(page, 3);
    expect(liCount).to.deep.equal({ 0: 1, 1: 1 });
  });

  it("calPageList with small data", () => {
    const pg = new paginationCalculator();
    pg.set(TOTAL, 20);
    pg.set(PER_PAGE_NUM, 10);
    const pgList1 = pg.genPageList(10);
    expect(pgList1.list[0]).to.equal("currentPage");
    expect(pgList1.list[1]).to.include({ 0: 10, 1: 19 });
    pg.set(BEGIN, 10);
    const pgList2 = pg.genPageList(10);
    expect(pgList2.list[1]).to.equal("currentPage");
    expect(pgList2.list[0]).to.include({ 0: 0, 1: 9 });
  });

  it("test calculate first page with type=page", () => {
    const pg = new paginationCalculator();
    const page = pg.getPage();
    page.set(PER_PAGE_NUM, 10);
    pg.process(page);
    expect(page).to.include({ 0: 0, 1: 0, currentPage: 1, type: "page" });
  });
});
