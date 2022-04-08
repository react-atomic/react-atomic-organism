import { expect } from "chai";
import { render } from "reshow-unit";

import StockChart from "../StockChart";

describe("Test stock chart", () => {
  it("basic test", () => {
    const wrap = render(<StockChart />);
    const html = wrap.html();
    expect(html).to.equal("");
  });
});
