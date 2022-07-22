import { expect } from "chai";
import { getSinon } from "reshow-unit";

import DLog from "../dlog";

describe("Dlog Test", () => {

  it("pass empty", () => {
    const log = new DLog();
    log.info();
    [false, null, undefined].forEach(item => log.info(item));
  });

  it("is not data set", () => {
    const sinon = getSinon();
    const consoleTable = sinon.spy(console, "table");
    const consoleInfo = sinon.spy(console, "info");
    const log = new DLog();
    log.info([0, 1, null, undefined, false]);
    expect(consoleTable.called).to.be.false;
    expect(consoleInfo.called).to.be.true;
  });

  it("is not data set - another sample", () => {
    const sinon = getSinon();
    const consoleTable = sinon.spy(console, "table");
    const consoleInfo = sinon.spy(console, "info");
    const log = new DLog();
    log.info({
      0: {0: 111, 1: 222},
      1: "333" 
    });
    expect(consoleTable.called).to.be.false;
    expect(consoleInfo.called).to.be.true;
  });

  it("is data set", () => {
    const sinon = getSinon();
    const consoleTable = sinon.spy(console, "table");
    const consoleInfo = sinon.spy(console, "info");
    const log = new DLog();
    log.info({
      0: { a: 1 },
      1: { a: 2 },
    });
    expect(consoleTable.called).to.be.true;
    expect(consoleInfo.called).to.be.true;
  });

});
