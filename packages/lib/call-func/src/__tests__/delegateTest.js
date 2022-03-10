import { expect } from "chai";
import { jsdom, cleanIt } from "reshow-unit-dom";
import query from "css-query-selector";

import delegate from "../delegate";

describe("Test delegate", () => {
  beforeEach(() => {
    jsdom(null, { url: "http://localhost" });
  });

  afterEach(() => {
    jsdom();
  });

  it("basic test", (done) => {
    document.body.innerHTML = `
      <div class="test"></div>
    `;
    delegate(document.body, "click", ".test", (e) => {
      expect(e.target.className).to.equal("test");
      expect(e.currentTarget.className).to.equal("test");
      done();
    });
    query.one(".test").dispatchEvent(new Event("click", { bubbles: true }));
  });
});
