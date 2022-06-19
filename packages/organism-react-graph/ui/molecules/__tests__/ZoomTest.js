import { expect } from "chai";
import { jsdom, render, waitFor } from "reshow-unit";

import Zoom from "../Zoom";

describe("Test Zoom", () => {
  beforeEach(() => {
    jsdom(null, { runScripts: "dangerously", resources: "usable" });
  });

  it("base test", async () => {
    const onD3Load = () => {};
    const vDom = (
      <svg>
        <Zoom onD3Load={onD3Load} />
      </svg>
    );
    const wrap = render(vDom);

    await waitFor(() => {
      const html = wrap.html();
      expect(html).to.have.string("zoom");
    });
  });
});
