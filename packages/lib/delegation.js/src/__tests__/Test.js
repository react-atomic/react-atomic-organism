//@ts-check
import { expect } from "chai";
import query from "css-query-selector";

import delegate from "../index";

describe("Test delegate", () => {
  it("basic test", (done) => {
    document.body.innerHTML = `
      <div class="test"></div>
    `;
    delegate(document.body, "click", ".test", (/**@type MouseEvent*/ e) => {
      const t = /** @type HTMLElement */ (e.target);
      const ct = /** @type HTMLElement */ (e.currentTarget);
      expect(t.className).to.equal("test");
      expect(ct.className).to.equal("test");
      done();
    });
    const fakeClick = new MouseEvent("click", { bubbles: true });
    query.one(".test").dispatchEvent(fakeClick);
  });
});
