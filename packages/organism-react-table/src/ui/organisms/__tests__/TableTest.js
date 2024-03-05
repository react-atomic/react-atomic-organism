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
  it("has row", () => {
    const rows = [["a1"], ["a2"]];
    const Dom = () => {
      return (
        <Table rows={rows}>
          <Column
            header={<Cell>c1</Cell>}
            cell={({
              "data-row-index": rowIndex,
              "data-col-index": columnIndex,
            }) => {
              return rows[rowIndex][columnIndex];
            }}
          />
        </Table>
      );
    };
    const wrap = render(<Dom />);
    const html = wrap.html();
    console.log({ html });
    expect(html).to.have.string("tbody");
  });
});
