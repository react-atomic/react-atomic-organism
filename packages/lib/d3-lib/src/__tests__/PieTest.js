import { pie, arc } from "../getD3";
import { expect } from "chai";
import get from "get-object-value";

describe("pie", () => {
  it("data", () => {
    const data = [
      { value: 50, name: "Locke" },
      { value: 50, name: "Reyes" },
    ];
    const result = pie(data, 10, 100);
    expect(get(result, ["items", 0, "value"])).to.equal(50);
  });
});

describe("arc", () => {
  it("simple test", () => {
    const data = [{ startAngle: 0, endAngle: Math.PI / 2 }];
    const result = arc(data, 20, 40, 5);
    const path = get(result, ["items", 0, "path"]);
    const centroid = get(result, ["items", 0, "centroid"]);
    expect(path).to.equal(
      "M1.7763568394002505e-15,-34.64101615137754A5,5,0,0,1,5.714285714285716,-39.58973274443148A40,40,0,0,1,39.58973274443148,-5.714285714285715A5,5,0,0,1,34.64101615137754,0L24.494897427831784,0A5,5,0,0,1,19.59591794226543,-3.999999999999999A20,20,0,0,0,3.9999999999999987,-19.595917942265423A5,5,0,0,1,8.881784197001252e-16,-24.494897427831784Z"
    );
    expect(parseInt(centroid[0], 10)).to.equal(21);
    expect(parseInt(centroid[1], 10)).to.equal(-21);
  });
});
