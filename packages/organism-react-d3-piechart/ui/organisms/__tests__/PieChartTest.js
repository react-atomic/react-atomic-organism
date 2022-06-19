import { expect } from "chai";
import { jsdom, render, waitFor } from "reshow-unit";

import PieChart from "../PieChart";

describe("Test PieChart", () => {
  beforeEach(() => {
    jsdom(null, { runScripts: "dangerously", resources: "usable" });
  });

  it("basic test", async () => {
    const wrap = render(<PieChart />);
    waitFor(() => {
      const html = wrap.html();
      expect(html).to.have.string("svg");
    });
  });
});
