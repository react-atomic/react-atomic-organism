"use strict";

import toPercent, { percent, round, toNum, getNum, toInt } from "../index.js";
import { expect } from "chai";

describe("Test to percent", () => {
  const n = 1;
  it("To string", () => {
    expect(toPercent(n)).to.equal("100.00%");
  });
});

describe("Test round", () => {
  it("Test float", () => {
    expect(round(2.225)).to.equal("2.23");
  });
  it("Test int", () => {
    expect(round(1)).to.equal("1.00");
  });
  it("Test float string", () => {
    expect(round("2.225")).to.equal("2.23");
  });
  it("Test int string", () => {
    expect(round("1")).to.equal("1.00");
  });
  it("Test 0", () => {
    expect(round(0)).to.equal("0.00");
  });
});

describe("Test percent", () => {
  it("Test 1", () => {
    expect(percent(1)).to.equal("100.00");
  });
  it("Test empty", () => {
    expect(percent(undefined)).to.equal("0.00");
  });
});

describe("to num", () => {
  it("Test bool", () => {
    expect(toNum(true)).to.equal(1);
    expect(toNum(false)).to.equal(0);
  });
  it("Test empty", () => {
    expect(toNum([])).to.equal(0);
    expect(toNum(null)).to.equal(0);
    expect(toNum("")).to.equal(0);
  });
  it("Test int", () => {
    expect(toNum(1)).to.equal(1);
  });
  it("Test float", () => {
    expect(toNum(1.1)).to.equal(1.1);
  });
  it("Test int string", () => {
    expect(toNum("1")).to.equal(1);
  });
  it("Test float string", () => {
    expect(toNum("1.1")).to.equal(1.1);
  });
  it("Test Hexadecimal", () => {
    expect(toNum(0xa)).to.equal(10);
  });
  it("Test 4.89e7", () => {
    expect(toNum(4.89e7)).to.equal(48900000);
    expect(toNum("4.89e7")).to.equal(48900000);
  });
  it("Test 100.01f", () => {
    expect(toNum("100.01f")).to.equal(100.01);
  });
  it("Test over max-int", () => {
    const overInt = "20210106042517623"; 
    expect(toNum(overInt)).to.equal(overInt);
  });
});

describe("To Int", () => {
  it("Test from string", () => {
    expect(toInt("1")).to.equal(1);
  });
  it("Test from float", () => {
    expect(toInt(1.1)).to.equal(1);
    expect(toInt(1.5)).to.equal(2);
  });
  it("Test from float string", () => {
    expect(toInt("1.1")).to.equal(1);
    expect(toInt("1.5")).to.equal(2);
  });
});

describe("Get Num", () => {
  it("Test input number", () => {
    const intV = 1;
    expect(getNum(intV)).to.equal(intV);
    const flotV = 0.1;
    expect(getNum(flotV)).to.equal(flotV);
  });
  it("Test input object", () => {
    const v = {};
    expect(getNum(v)).to.equal(0);
  });
  it("Test get int", () => {
    const s = "cd2";
    expect(getNum(s)).to.equal(2);
  });
  it("Test get multi int", () => {
    const s = "cd22";
    expect(getNum(s)).to.equal(22);
  });
  it("Test get float", () => {
    const s = "cd2.1";
    expect(getNum(s)).to.equal(2.1);
  });
  it("Test get multi float", () => {
    const s = "cd20.13";
    expect(getNum(s)).to.equal(20.13);
  });
  it("Test get multi float and end with zero", () => {
    const s = "cd20.10";
    expect(getNum(s)).to.equal(20.1);
  });
  it("Test negative number", () => {
    const s = "cd-2.1";
    expect(getNum(s)).to.equal(-2.1);
  });
});
