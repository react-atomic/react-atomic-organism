import { expect } from "chai";
import { jsdom, render, waitFor, act } from "reshow-unit";

import DragAndDrop from "../DragAndDrop";

describe("Test DragAndDrop", () => {
  beforeEach(() => {
    jsdom(null, { runScripts: "dangerously", resources: "usable" });
  });

  it("base test", async () => {
    const Comp = ({ onGetEl }) => <div ref={onGetEl} />;
    const onD3Load = () => {};
    const wrap = render(<DragAndDrop component={Comp} onD3Load={onD3Load} />);
    await act(()=>{}, 1000);
    await waitFor(() => {
      const html = wrap.html();
      expect(html).to.have.string("div");
    });
  });
});
