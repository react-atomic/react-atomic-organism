import { expect } from "chai";

import getOffset from "../index";

describe("Get Offset", () => {
  const html = `<div id="dom">unit</div>`;
  document.body.innerHTML = html;
  it("test get offset", () => {
    const dom = document.querySelector("#dom");
    const offset = getOffset(dom);
    expect(offset).to.include({
      w: 0,
      h: 0,
      top: 0,
      right: 0,
      bottom: 0,
      left: 0,
    });
  });
});
