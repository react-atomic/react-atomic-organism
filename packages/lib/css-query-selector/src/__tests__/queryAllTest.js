import { expect } from "chai";
import { defaultQuery as query } from "../queryFrom";

describe("Test query all", () => {
  after(() => (document.body.innerHTML = ""));

  it("test super queryAll", () => {
    document.body.innerHTML = `
<main id="root"><div></div><span></span></main>
`;
    const acture = query.all(["main", "div", "span"]);
    expect(acture.length).to.be.equal(3);
  });

  it("test query nothing", () => {
    const acture1 = query.all(null);
    const acture2 = query.all(undefined);
    const acture3 = query.all();
    expect([acture1, acture2, acture3]).to.deep.equal([
      null,
      undefined,
      undefined,
    ]);
  });
});
