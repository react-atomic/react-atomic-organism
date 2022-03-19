import { expect } from "chai";

import layout from "../layout";
import { Graph } from "../graphlib";
import { zipObject, pick } from "../../../lodash-lite";

const extractCoordinates = (g) => {
  const nodes = g.nodes();
  return zipObject(
    nodes,
    nodes.map((v) => pick(g.node(v), ["x", "y"]))
  );
};

describe("Test Layout", () => {
  let g;

  beforeEach(() => {
    g = new Graph({ multigraph: true, compound: true })
      .setGraph({})
      .setDefaultEdgeLabel(() => ({}));
  });

  it("can layout a single node", () => {
    g.setNode("a", { width: 50, height: 100 });
    layout(g);
    expect(extractCoordinates(g)).to.eql({
      a: { x: 50 / 2, y: 100 / 2 },
    });
    expect(g.node("a").x).to.equal(50 / 2);
    expect(g.node("a").y).to.equal(100 / 2);
  });

  it("can layout two nodes on the same rank", function () {
    g.graph().nodesep = 200;
    g.setNode("a", { width: 50, height: 100 });
    g.setNode("b", { width: 75, height: 200 });
    layout(g);
    expect(extractCoordinates(g)).to.eql({
      a: { x: 50 / 2, y: 200 / 2 },
      b: { x: 50 + 200 + 75 / 2, y: 200 / 2 },
    });
  });

  it("can layout two nodes connected by an edge", function () {
    g.graph().ranksep = 300;
    g.setNode("a", { width: 50, height: 100 });
    g.setNode("b", { width: 75, height: 200 });
    g.setEdge("a", "b");
    layout(g);
    expect(extractCoordinates(g)).to.eql({
      a: { x: 75 / 2, y: 100 / 2 },
      b: { x: 75 / 2, y: 100 + 300 + 200 / 2 },
    });

    // We should not get x, y coordinates if the edge has no label
    expect(g.edge("a", "b")).to.not.have.property("x");
    expect(g.edge("a", "b")).to.not.have.property("y");
  });
  it("can layout three nodes connected by same edge", () => {
    g.graph().ranksep = 300;
    g.setNode("a", { width: 50, height: 100 });
    g.setNode("b", { width: 75, height: 200 });
    g.setNode("c", { width: 75, height: 200 });
    g.setEdge("a", "b");
    g.setEdge("a", "c");
    layout(g);
    expect(extractCoordinates(g)).to.eql({
      a: { x: 100, y: 50 },
      b: { x: 37.5, y: 500 },
      c: { x: 162.5, y: 500 },
    });
  });
});
