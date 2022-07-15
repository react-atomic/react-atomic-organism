import { expect } from "chai";
import { render, waitFor } from "reshow-unit";

import getDocTemplate from "../getDocTemplate";

describe("Test getDocTemplate", () => {
  it("simple test", async () => {
    const DocTemplate = getDocTemplate();
    const wrap = render(<DocTemplate />);
    await waitFor(() => {
      const html = wrap.html();
      expect(html).to.have.string("div");
    });
  });
});
