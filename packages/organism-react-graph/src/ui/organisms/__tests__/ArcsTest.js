import { expect } from "chai";
import { jsdom, render, waitFor } from "reshow-unit";

import Arc from "../Arc";

describe("Test Arc Component", () => {
  beforeEach(() => {
    jsdom(null, { runScripts: "dangerously", resources: "usable" });
  });

  it("base test", async () => {
    const onD3Load = () => {};

    const comp = (
      <svg>
        <Arc startAngle={0} endAngle={Math.PI} onD3Load={onD3Load} />
      </svg>
    );
    const wrap = render(comp);
    await waitFor(() => {
      const html = wrap.html();
      expect(html).to.equal(
        '<svg><g class="arc"><path d="M3.061616997868383e-15,-50A50,50,0,1,1,3.061616997868383e-15,50L0,0Z"></path></g></svg>',
      );
    });
  });
});
