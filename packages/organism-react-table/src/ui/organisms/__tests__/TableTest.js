//@ts-check

import * as React from "react";
import { expect } from "chai";
import { render } from "reshow-unit";

import Table from "../Table";
import Column from "../Column";
import Cell from "../Cell";

describe("Test Table", () => {
  it("basic test", () => {
    const wrap = render(<Table />);
    const html = wrap.html();
    expect(html).to.have.string("table");
    expect(html).not.have.string("tbody");
  });

  it("Test Has Row", () => {
    const rows = [["row1"], ["row2"]];
    const Dom = () => (
      <Table rows={rows}>
        <Column
          cell={({
            "data-row-index": rowIndex,
            "data-col-index": columnIndex,
          }) => {
            return rows[rowIndex][columnIndex];
          }}
        />
      </Table>
    );
    const wrap = render(<Dom />);
    const html = wrap.html();
    expect(html).to.have.string("tbody");
  });

  it("Test empty header", () => {
    const Dom = () => {
      return (
        <Table>
          <Column />
          <Column header={<Cell>h1</Cell>} />
        </Table>
      );
    };
    const wrap = render(<Dom />);
    const html = wrap.html();
    console.log({ html });
    expect(html).to.have.string(
      `<th data-atom="th"></th><th data-atom="th">h1</th>`
    );
  });
});
