import React from "react";

import { expect } from "chai";
import { render, waitFor } from "reshow-unit";

import Asciidoc from "../Asciidoc";

describe("Test Asciidoc", () => {
  it("simple test", async () => {
    const adoc = `
:toc:
:toc-placement!:
toc::[]

= h1 - test
test
`;
    let asciidoc;
    const wrap = render(
      <Asciidoc ref={(el) => (asciidoc = el)}>{adoc}</Asciidoc>,
    );
    await waitFor(() => {
      expect(asciidoc.getBody().innerHTML).to.have.string("div");
    });
  });
});
