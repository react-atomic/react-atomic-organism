import { expect } from "chai";

import { Graph, alg } from "../graphlib";
import * as acyclic from "../acyclic";

const ACYCLICERS = ["greedy", "dfs", "unknown-should-still-work"];
const { findCycles } = alg;

const stripLabel = (edge) => {
  const { label, ...c } = edge;
  return c;
};

describe("Test acyclic", () => {
  let g;
  beforeEach(() => {
    g = new Graph({ multigraph: true }).setDefaultEdgeLabel(() => ({
      minlen: 1,
      weight: 1,
    }));
  });

  ACYCLICERS.forEach((acyclicer) => {
    describe(acyclicer, () => {
      beforeEach(() => {
        g.setGraph({ acyclicer: acyclicer });
      });

      describe("run", () => {
        it("does not change an already acyclic graph", () => {
          g.setPath(["a", "b", "d"]);
          g.setPath(["a", "c", "d"]);
          acyclic.run(g);
          const results = g.edges().map(stripLabel);
          expect(results).to.have.deep.members([
            { v: "a", w: "b" },
            { v: "a", w: "c" },
            { v: "b", w: "d" },
            { v: "c", w: "d" },
          ]);
        });
        it("breaks cycles in the input graph", () => {
          g.setPath(["a", "b", "c", "d", "a"]);
          acyclic.run(g);
          expect(findCycles(g)).to.eql([]);
        });
        it("creates a multi-edge where necessary", () => {
          g.setPath(["a", "b", "a"]);
          acyclic.run(g);
          expect(findCycles(g)).to.eql([]);
          if (g.hasEdge("a", "b")) {
            expect(g.outEdges("a", "b")).to.have.length(2);
          } else {
            expect(g.outEdges("b", "a")).to.have.length(2);
          }
          expect(g.edgeCount()).to.equal(2);
        });
      });

      describe("undo", () => {
        it("does not change edges where the original graph was acyclic", () => {
          g.setEdge("a", "b", { minlen: 2, weight: 3 });
          acyclic.run(g);
          acyclic.undo(g);
          expect(g.edge("a", "b")).to.eql({ minlen: 2, weight: 3 });
          expect(g.edges()).to.have.length(1);
        });

        it("can restore previosuly reversed edges", () => {
          g.setEdge("a", "b", { minlen: 2, weight: 3 });
          g.setEdge("b", "a", { minlen: 3, weight: 4 });
          acyclic.run(g);
          acyclic.undo(g);
          expect(g.edge("a", "b")).to.eql({ minlen: 2, weight: 3 });
          expect(g.edge("b", "a")).to.eql({ minlen: 3, weight: 4 });
          expect(g.edges()).to.have.length(2);
        });
      });
    });
  });

  describe("greedy-specific functionality", () => {
    it("prefers to break cycles at low-weight edges", () => {
      g.setGraph({ acyclicer: "greedy" });
      g.setDefaultEdgeLabel(function () {
        return { minlen: 1, weight: 2 };
      });
      g.setPath(["a", "b", "c", "d", "a"]);
      g.setEdge("c", "d", { weight: 1 });
      acyclic.run(g);
      expect(findCycles(g)).to.eql([]);
      expect(g.hasEdge("c", "d")).to.be.false;
    });
  });
});
