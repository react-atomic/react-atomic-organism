import {
  getPointsCenter,
  line,
  curve,
  stack,
  hArea,
  colors,
  scaleBand,
  scaleLinear,
} from "../index";

import { expect } from "chai";
import get from "get-object-value";

describe("basic", () => {
  it("colors", () => {
    expect(colors()(3)).to.equals("#1f77b4");
  });
});

describe("stack", () => {
  it("data", () => {
    let data = [
      { apples: 3840, bananas: 1920, cherries: 960, dates: 400 },
      { apples: 1600, bananas: 1440, cherries: 960, dates: 400 },
    ];
    let result = stack(data);
    // console.log(result);
  });

  it("scaleBand", () => {
    let data = [{ label: "a" }, { label: "b" }];
    const result = scaleBand(data, 0, 500);
    expect(result.length).to.be.above(243);
    expect(result.list).to.have.deep.property("a", { start: 0, value: 122 });
    expect(result.scaler).to.be.an("function");
  });

  it("scaleLinear", () => {
    let data = [{ value: 11 }, { value: 22 }, { value: 33 }];
    let result = scaleLinear(data, 500, 0);
    //console.log(result);
  });
  it("invert", () => {
    const data = [{ value: 10 }, { value: 22 }, { value: 33 }];
    const linear = scaleLinear(data, 500, 0, (d) => d.value);
    const scaler = linear.scaler;
    const number = scaler(10);
    expect(scaler.invert(number)).to.equal(10);
  });
});

describe("curve", () => {
  const data = [
    { x: 0, y: 20 },
    { x: 1, y: 30 },
    { x: 2, y: 10 },
    { x: 3, y: 5 },
    { x: 4, y: 8 },
    { x: 5, y: 15 },
    { x: 6, y: 10 },
  ];
  it("data", () => {
    let xLocator = (d) => {
      return d.x;
    };
    let yLocator = (d) => {
      return d.y;
    };
    let xScale = scaleBand(data, 0, 500, xLocator);
    let yScale = scaleLinear(data, 500, 0, yLocator);
    const result = curve(data, xLocator, yLocator, xScale, yScale);
    const expected =
      "M68.34532374100718,192C68.34532374100718,192,119.09016773530556,-1.846453936567319,140.28776978417264,0C169.58513998737726,2.551998307075889,175.79345245068353,302.0583204180711,212.2302158273381,385C232.395813002623,430.9033224823245,258.4117898934848,477.7738860797655,284.1726618705036,481C306.7822821646624,483.8314728952993,334.4705184481537,449.174180543014,356.115107913669,423C383.96322178568744,389.32407551873786,402.4835319141224,289.90270574356003,428.05755395683445,288C450.78058394406463,286.30940789854714,499.99999999999994,385,499.99999999999994,385";
    expect(result).to.equal(expected);
  });
});

describe("line", () => {
  const data = [
    { x: 0, y: 0 },
    { x: 10, y: 10 },
  ];
  it("test get center", () => {
    const c = getPointsCenter(data);
    expect(c).to.deep.equal({ x: 5, y: 5 });
  });
  it("test get line", () => {
    const thisLine = line(data[0], data[1], true);
    const expected =
      "M0,0L0.8333333333333334,0C1.6666666666666667,0,3.3333333333333335,0,5,1.6666666666666667C6.666666666666667,3.3333333333333335,8.333333333333334,6.666666666666667,9.166666666666666,8.333333333333334L10,10";
    expect(thisLine.d).to.equal(expected);
    expect(thisLine.center).to.deep.equal({ x: 5, y: 0 });
  });
  it("test no curve", () => {
    const thisLine = line(data[0], data[1]);
    const expected = "M0,0L10,10";
    expect(thisLine.d).to.equal(expected);
    expect(thisLine.center).to.deep.equal({ x: 5, y: 5 });
  });
});

describe("area", () => {
  it("hArea", () => {
    let data = [
      { x: 1, y0: 3, y1: 3 },
      { x: 4, y0: 5, y1: 6 },
    ];
    let result = hArea(data);
    expect(result).to.have.string("M");
    expect(result).to.not.have.string("NaN");
  });
});
