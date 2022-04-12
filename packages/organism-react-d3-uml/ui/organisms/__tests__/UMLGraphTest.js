import { expect } from "chai";
import { render } from "reshow-unit";

import UMLGraph from "../UMLGraph";

describe("Test UMLGraph", () => {
  it("simple test", () => {
    const vDom = <UMLGraph />;
    const wrap = render(vDom);
    const actual = wrap.html();
    expect(actual).to.have.string("d3-uml");
  });
});
