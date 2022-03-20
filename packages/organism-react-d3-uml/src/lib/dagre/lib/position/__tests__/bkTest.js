import { expect } from "chai";
import { Graph } from "../../graphlib";
import { buildLayerMatrix } from "../../util";

import {
  positionX,
  findType1Conflicts,
  findType2Conflicts,
  findSmallestWidthAlignment,
  addConflict,
  hasConflict,
  verticalAlignment,
  horizontalCompaction,
  alignCoordinates,
  balance,
} from "../bk";

describe("dagre/position/bk", () => {
  let g;
  beforeEach(() => {
    g = new Graph().setGraph({});
  });
  describe("findType1Conflicts", () => {
    let layering;
    beforeEach(() => {
      g.setDefaultEdgeLabel(() => ({}))
        .setNode("a", { rank: 0, order: 0 })
        .setNode("b", { rank: 0, order: 1 })
        .setNode("c", { rank: 1, order: 0 })
        .setNode("d", { rank: 1, order: 1 })
        // Set up crossing
        .setEdge("a", "d")
        .setEdge("b", "c");

      layering = buildLayerMatrix(g);
    });
    it("does not mark edges that have no conflict", () => {
      g.removeEdge("a", "d");
      g.removeEdge("b", "c");
      g.setEdge("a", "c");
      g.setEdge("b", "d");

      const conflicts = findType1Conflicts(g, layering);
      expect(hasConflict(conflicts, "a", "c")).to.be.false;
      expect(hasConflict(conflicts, "b", "d")).to.be.false;
    });
    it("does not mark type-0 conflicts (no dummies)", () => {
      const conflicts = findType1Conflicts(g, layering);
      expect(hasConflict(conflicts, "a", "d")).to.be.false;
      expect(hasConflict(conflicts, "b", "c")).to.be.false;
    });
    ["a", "b", "c", "d"].forEach((v) => {
      it("does not mark type-0 conflicts (" + v + " is dummy)", () => {
        g.node(v).dummy = true;
        const conflicts = findType1Conflicts(g, layering);
        expect(hasConflict(conflicts, "a", "d")).to.be.false;
        expect(hasConflict(conflicts, "b", "c")).to.be.false;
      });

      it("does mark type-1 conflicts (" + v + " is non-dummy)", () => {
        ["a", "b", "c", "d"].forEach((w) => {
          if (v !== w) {
            g.node(w).dummy = true;
          }
        });

        const conflicts = findType1Conflicts(g, layering);
        if (v === "a" || v === "d") {
          expect(hasConflict(conflicts, "a", "d")).to.be.true;
          expect(hasConflict(conflicts, "b", "c")).to.be.false;
        } else {
          expect(hasConflict(conflicts, "a", "d")).to.be.false;
          expect(hasConflict(conflicts, "b", "c")).to.be.true;
        }
      });
    });
    it("does not mark type-2 conflicts (all dummies)", function () {
      ["a", "b", "c", "d"].forEach((v) => {
        g.node(v).dummy = true;
      });

      const conflicts = findType1Conflicts(g, layering);
      expect(hasConflict(conflicts, "a", "d")).to.be.false;
      expect(hasConflict(conflicts, "b", "c")).to.be.false;
      findType1Conflicts(g, layering);
    });
  });

  describe("findType2Conflicts", () => {
    let layering;
    beforeEach(() => {
      g.setDefaultEdgeLabel(() => ({}))
        .setNode("a", { rank: 0, order: 0 })
        .setNode("b", { rank: 0, order: 1 })
        .setNode("c", { rank: 1, order: 0 })
        .setNode("d", { rank: 1, order: 1 })
        // Set up crossing
        .setEdge("a", "d")
        .setEdge("b", "c");

      layering = buildLayerMatrix(g);
    });
    it("marks type-2 conflicts favoring border segments #1", () => {
      ["a", "d"].forEach((v) => {
        g.node(v).dummy = true;
      });

      ["b", "c"].forEach((v) => {
        g.node(v).dummy = "border";
      });

      const conflicts = findType2Conflicts(g, layering);
      expect(hasConflict(conflicts, "a", "d")).to.be.true;
      expect(hasConflict(conflicts, "b", "c")).to.be.false;
    });
    it("marks type-2 conflicts favoring border segments #2", () => {
      ["b", "c"].forEach((v) => {
        g.node(v).dummy = true;
      });

      ["a", "d"].forEach((v) => {
        g.node(v).dummy = "border";
      });

      const conflicts = findType2Conflicts(g, layering);
      expect(hasConflict(conflicts, "a", "d")).to.be.false;
      expect(hasConflict(conflicts, "b", "c")).to.be.true;
    });
  });
  describe("hasConflict", () => {
    it("can test for a type-1 conflict regardless of edge orientation", () => {
      const conflicts = {};
      addConflict(conflicts, "b", "a");
      expect(hasConflict(conflicts, "a", "b")).to.be.true;
      expect(hasConflict(conflicts, "b", "a")).to.be.true;
    });

    it("works for multiple conflicts with the same node", () => {
      const conflicts = {};
      addConflict(conflicts, "a", "b");
      addConflict(conflicts, "a", "c");
      expect(hasConflict(conflicts, "a", "b")).to.be.true;
      expect(hasConflict(conflicts, "a", "c")).to.be.true;
    });
  });
  describe("verticalAlignment", () => {
    it("Aligns with itself if the node has no adjacencies", () => {
      g.setNode("a", { rank: 0, order: 0 });
      g.setNode("b", { rank: 1, order: 0 });

      const layering = buildLayerMatrix(g);
      const conflicts = {};

      const result = verticalAlignment(
        g,
        layering,
        conflicts,
        g.predecessors.bind(g)
      );
      expect(result).to.eql({
        root: { a: "a", b: "b" },
        align: { a: "a", b: "b" },
      });
    });

    it("Aligns with its sole adjacency", () => {
      g.setNode("a", { rank: 0, order: 0 });
      g.setNode("b", { rank: 1, order: 0 });
      g.setEdge("a", "b");

      const layering = buildLayerMatrix(g);
      const conflicts = {};

      const result = verticalAlignment(
        g,
        layering,
        conflicts,
        g.predecessors.bind(g)
      );
      expect(result).to.eql({
        root: { a: "a", b: "a" },
        align: { a: "b", b: "a" },
      });
    });

    it("aligns with its left median when possible", () => {
      g.setNode("a", { rank: 0, order: 0 });
      g.setNode("b", { rank: 0, order: 1 });
      g.setNode("c", { rank: 1, order: 0 });
      g.setEdge("a", "c");
      g.setEdge("b", "c");

      const layering = buildLayerMatrix(g);
      const conflicts = {};

      const result = verticalAlignment(
        g,
        layering,
        conflicts,
        g.predecessors.bind(g)
      );
      expect(result).to.eql({
        root: { a: "a", b: "b", c: "a" },
        align: { a: "c", b: "b", c: "a" },
      });
    });

    it("aligns correctly even regardless of node name / insertion order", () => {
      // This test ensures that we're actually properly sorting nodes by
      // position when searching for candidates. Many of these tests previously
      // passed because the node insertion order matched the order of the nodes
      // in the layering.
      g.setNode("b", { rank: 0, order: 1 });
      g.setNode("c", { rank: 1, order: 0 });
      g.setNode("z", { rank: 0, order: 0 });
      g.setEdge("z", "c");
      g.setEdge("b", "c");

      const layering = buildLayerMatrix(g);
      const conflicts = {};

      const result = verticalAlignment(
        g,
        layering,
        conflicts,
        g.predecessors.bind(g)
      );
      expect(result).to.eql({
        root: { z: "z", b: "b", c: "z" },
        align: { z: "c", b: "b", c: "z" },
      });
    });

    it("aligns with its right median when left is unavailable", () => {
      g.setNode("a", { rank: 0, order: 0 });
      g.setNode("b", { rank: 0, order: 1 });
      g.setNode("c", { rank: 1, order: 0 });
      g.setEdge("a", "c");
      g.setEdge("b", "c");

      const layering = buildLayerMatrix(g);
      const conflicts = {};

      addConflict(conflicts, "a", "c");

      const result = verticalAlignment(
        g,
        layering,
        conflicts,
        g.predecessors.bind(g)
      );
      expect(result).to.eql({
        root: { a: "a", b: "b", c: "b" },
        align: { a: "a", b: "c", c: "b" },
      });
    });

    it("aligns with neither median if both are unavailable", () => {
      g.setNode("a", { rank: 0, order: 0 });
      g.setNode("b", { rank: 0, order: 1 });
      g.setNode("c", { rank: 1, order: 0 });
      g.setNode("d", { rank: 1, order: 1 });
      g.setEdge("a", "d");
      g.setEdge("b", "c");
      g.setEdge("b", "d");

      const layering = buildLayerMatrix(g);
      const conflicts = {};

      const result = verticalAlignment(
        g,
        layering,
        conflicts,
        g.predecessors.bind(g)
      );
      // c will align with b, so d will not be able to align with a, because
      // (a,d) and (c,b) cross.
      expect(result).to.eql({
        root: { a: "a", b: "b", c: "b", d: "d" },
        align: { a: "a", b: "c", c: "b", d: "d" },
      });
    });

    it("aligns with the single median for an odd number of adjacencies", () => {
      g.setNode("a", { rank: 0, order: 0 });
      g.setNode("b", { rank: 0, order: 1 });
      g.setNode("c", { rank: 0, order: 2 });
      g.setNode("d", { rank: 1, order: 0 });
      g.setEdge("a", "d");
      g.setEdge("b", "d");
      g.setEdge("c", "d");

      const layering = buildLayerMatrix(g);
      const conflicts = {};

      const result = verticalAlignment(
        g,
        layering,
        conflicts,
        g.predecessors.bind(g)
      );
      expect(result).to.eql({
        root: { a: "a", b: "b", c: "c", d: "b" },
        align: { a: "a", b: "d", c: "c", d: "b" },
      });
    });

    it("aligns blocks across multiple layers", () => {
      g.setNode("a", { rank: 0, order: 0 });
      g.setNode("b", { rank: 1, order: 0 });
      g.setNode("c", { rank: 1, order: 1 });
      g.setNode("d", { rank: 2, order: 0 });
      g.setPath(["a", "b", "d"]);
      g.setPath(["a", "c", "d"]);

      const layering = buildLayerMatrix(g);
      const conflicts = {};

      const result = verticalAlignment(
        g,
        layering,
        conflicts,
        g.predecessors.bind(g)
      );
      expect(result).to.eql({
        root: { a: "a", b: "a", c: "c", d: "a" },
        align: { a: "b", b: "d", c: "c", d: "a" },
      });
    });
  });
  describe("horizonalCompaction", () => {
    it("places the center of a single node graph at origin (0,0)", () => {
      const root = { a: "a" };
      const align = { a: "a" };
      g.setNode("a", { rank: 0, order: 0 });

      const xs = horizontalCompaction(g, buildLayerMatrix(g), root, align);
      expect(xs.a).to.equal(0);
    });

    it("separates adjacent nodes by specified node separation", () => {
      const root = { a: "a", b: "b" };
      const align = { a: "a", b: "b" };
      g.graph().nodesep = 100;
      g.setNode("a", { rank: 0, order: 0, width: 100 });
      g.setNode("b", { rank: 0, order: 1, width: 200 });

      const xs = horizontalCompaction(g, buildLayerMatrix(g), root, align);
      expect(xs.a).to.equal(0);
      expect(xs.b).to.equal(100 / 2 + 100 + 200 / 2);
    });

    it("separates adjacent edges by specified node separation", () => {
      const root = { a: "a", b: "b" };
      const align = { a: "a", b: "b" };
      g.graph().edgesep = 20;
      g.setNode("a", { rank: 0, order: 0, width: 100, dummy: true });
      g.setNode("b", { rank: 0, order: 1, width: 200, dummy: true });

      const xs = horizontalCompaction(g, buildLayerMatrix(g), root, align);
      expect(xs.a).to.equal(0);
      expect(xs.b).to.equal(100 / 2 + 20 + 200 / 2);
    });

    it("aligns the centers of nodes in the same block", () => {
      const root = { a: "a", b: "a" };
      const align = { a: "b", b: "a" };
      g.setNode("a", { rank: 0, order: 0, width: 100 });
      g.setNode("b", { rank: 1, order: 0, width: 200 });

      const xs = horizontalCompaction(g, buildLayerMatrix(g), root, align);
      expect(xs.a).to.equal(0);
      expect(xs.b).to.equal(0);
    });

    it("separates blocks with the appropriate separation", () => {
      const root = { a: "a", b: "a", c: "c" };
      const align = { a: "b", b: "a", c: "c" };
      g.graph().nodesep = 75;
      g.setNode("a", { rank: 0, order: 0, width: 100 });
      g.setNode("b", { rank: 1, order: 1, width: 200 });
      g.setNode("c", { rank: 1, order: 0, width: 50 });

      const xs = horizontalCompaction(g, buildLayerMatrix(g), root, align);
      expect(xs.a).to.equal(50 / 2 + 75 + 200 / 2);
      expect(xs.b).to.equal(50 / 2 + 75 + 200 / 2);
      expect(xs.c).to.equal(0);
    });

    it("separates classes with the appropriate separation", () => {
      const root = { a: "a", b: "b", c: "c", d: "b" };
      const align = { a: "a", b: "d", c: "c", d: "b" };
      g.graph().nodesep = 75;
      g.setNode("a", { rank: 0, order: 0, width: 100 });
      g.setNode("b", { rank: 0, order: 1, width: 200 });
      g.setNode("c", { rank: 1, order: 0, width: 50 });
      g.setNode("d", { rank: 1, order: 1, width: 80 });

      const xs = horizontalCompaction(g, buildLayerMatrix(g), root, align);
      expect(xs.a).to.equal(0);
      expect(xs.b).to.equal(100 / 2 + 75 + 200 / 2);
      expect(xs.c).to.equal(100 / 2 + 75 + 200 / 2 - 80 / 2 - 75 - 50 / 2);
      expect(xs.d).to.equal(100 / 2 + 75 + 200 / 2);
    });

    it("shifts classes by max sep from the adjacent block #1", () => {
      const root = { a: "a", b: "b", c: "a", d: "b" };
      const align = { a: "c", b: "d", c: "a", d: "b" };
      g.graph().nodesep = 75;
      g.setNode("a", { rank: 0, order: 0, width: 50 });
      g.setNode("b", { rank: 0, order: 1, width: 150 });
      g.setNode("c", { rank: 1, order: 0, width: 60 });
      g.setNode("d", { rank: 1, order: 1, width: 70 });

      const xs = horizontalCompaction(g, buildLayerMatrix(g), root, align);
      expect(xs.a).to.equal(0);
      expect(xs.b).to.equal(50 / 2 + 75 + 150 / 2);
      expect(xs.c).to.equal(0);
      expect(xs.d).to.equal(50 / 2 + 75 + 150 / 2);
    });

    it("shifts classes by max sep from the adjacent block #2", () => {
      const root = { a: "a", b: "b", c: "a", d: "b" };
      const align = { a: "c", b: "d", c: "a", d: "b" };
      g.graph().nodesep = 75;
      g.setNode("a", { rank: 0, order: 0, width: 50 });
      g.setNode("b", { rank: 0, order: 1, width: 70 });
      g.setNode("c", { rank: 1, order: 0, width: 60 });
      g.setNode("d", { rank: 1, order: 1, width: 150 });

      const xs = horizontalCompaction(g, buildLayerMatrix(g), root, align);
      expect(xs.a).to.equal(0);
      expect(xs.b).to.equal(60 / 2 + 75 + 150 / 2);
      expect(xs.c).to.equal(0);
      expect(xs.d).to.equal(60 / 2 + 75 + 150 / 2);
    });

    it("cascades class shift", () => {
      const root = { a: "a", b: "b", c: "c", d: "d", e: "b", f: "f", g: "d" };
      const align = { a: "a", b: "e", c: "c", d: "g", e: "b", f: "f", g: "d" };
      g.graph().nodesep = 75;
      g.setNode("a", { rank: 0, order: 0, width: 50 });
      g.setNode("b", { rank: 0, order: 1, width: 50 });
      g.setNode("c", { rank: 1, order: 0, width: 50 });
      g.setNode("d", { rank: 1, order: 1, width: 50 });
      g.setNode("e", { rank: 1, order: 2, width: 50 });
      g.setNode("f", { rank: 2, order: 0, width: 50 });
      g.setNode("g", { rank: 2, order: 1, width: 50 });

      const xs = horizontalCompaction(g, buildLayerMatrix(g), root, align);

      // Use f as 0, everything is relative to it
      expect(xs.a).to.equal(xs.b - 50 / 2 - 75 - 50 / 2);
      expect(xs.b).to.equal(xs.e);
      expect(xs.c).to.equal(xs.f);
      expect(xs.d).to.equal(xs.c + 50 / 2 + 75 + 50 / 2);
      expect(xs.e).to.equal(xs.d + 50 / 2 + 75 + 50 / 2);
      expect(xs.g).to.equal(xs.f + 50 / 2 + 75 + 50 / 2);
    });

    it("handles labelpos = l", () => {
      const root = { a: "a", b: "b", c: "c" };
      const align = { a: "a", b: "b", c: "c" };
      g.graph().edgesep = 50;
      g.setNode("a", { rank: 0, order: 0, width: 100, dummy: "edge" });
      g.setNode("b", {
        rank: 0,
        order: 1,
        width: 200,
        dummy: "edge-label",
        labelpos: "l",
      });
      g.setNode("c", { rank: 0, order: 2, width: 300, dummy: "edge" });

      const xs = horizontalCompaction(g, buildLayerMatrix(g), root, align);
      expect(xs.a).to.equal(0);
      expect(xs.b).to.equal(xs.a + 100 / 2 + 50 + 200);
      expect(xs.c).to.equal(xs.b + 0 + 50 + 300 / 2);
    });

    it("handles labelpos = c", () => {
      const root = { a: "a", b: "b", c: "c" };
      const align = { a: "a", b: "b", c: "c" };
      g.graph().edgesep = 50;
      g.setNode("a", { rank: 0, order: 0, width: 100, dummy: "edge" });
      g.setNode("b", {
        rank: 0,
        order: 1,
        width: 200,
        dummy: "edge-label",
        labelpos: "c",
      });
      g.setNode("c", { rank: 0, order: 2, width: 300, dummy: "edge" });

      const xs = horizontalCompaction(g, buildLayerMatrix(g), root, align);
      expect(xs.a).to.equal(0);
      expect(xs.b).to.equal(xs.a + 100 / 2 + 50 + 200 / 2);
      expect(xs.c).to.equal(xs.b + 200 / 2 + 50 + 300 / 2);
    });

    it("handles labelpos = r", () => {
      const root = { a: "a", b: "b", c: "c" };
      const align = { a: "a", b: "b", c: "c" };
      g.graph().edgesep = 50;
      g.setNode("a", { rank: 0, order: 0, width: 100, dummy: "edge" });
      g.setNode("b", {
        rank: 0,
        order: 1,
        width: 200,
        dummy: "edge-label",
        labelpos: "r",
      });
      g.setNode("c", { rank: 0, order: 2, width: 300, dummy: "edge" });

      const xs = horizontalCompaction(g, buildLayerMatrix(g), root, align);
      expect(xs.a).to.equal(0);
      expect(xs.b).to.equal(xs.a + 100 / 2 + 50 + 0);
      expect(xs.c).to.equal(xs.b + 200 + 50 + 300 / 2);
    });
  });
  describe("alignCoordinates", () => {
    it("aligns a single node", () => {
      const xss = {
        ul: { a: 50 },
        ur: { a: 100 },
        dl: { a: 50 },
        dr: { a: 200 },
      };

      alignCoordinates(xss, xss.ul);

      expect(xss.ul).to.eql({ a: 50 });
      expect(xss.ur).to.eql({ a: 50 });
      expect(xss.dl).to.eql({ a: 50 });
      expect(xss.dr).to.eql({ a: 50 });
    });

    it("aligns multiple nodes", () => {
      const xss = {
        ul: { a: 50, b: 1000 },
        ur: { a: 100, b: 900 },
        dl: { a: 150, b: 800 },
        dr: { a: 200, b: 700 },
      };

      alignCoordinates(xss, xss.ul);

      expect(xss.ul).to.eql({ a: 50, b: 1000 });
      expect(xss.ur).to.eql({ a: 200, b: 1000 });
      expect(xss.dl).to.eql({ a: 50, b: 700 });
      expect(xss.dr).to.eql({ a: 500, b: 1000 });
    });
  });
  describe("findSmallestWidthAlignment", () => {
    it("finds the alignment with the smallest width", () => {
      g.setNode("a", { width: 50 });
      g.setNode("b", { width: 50 });

      const xss = {
        ul: { a: 0, b: 1000 },
        ur: { a: -5, b: 1000 },
        dl: { a: 5, b: 2000 },
        dr: { a: 0, b: 200 },
      };

      expect(findSmallestWidthAlignment(g, xss)).to.eql(xss.dr);
    });

    it("takes node width into account", () => {
      g.setNode("a", { width: 50 });
      g.setNode("b", { width: 50 });
      g.setNode("c", { width: 200 });

      const xss = {
        ul: { a: 0, b: 100, c: 75 },
        ur: { a: 0, b: 100, c: 80 },
        dl: { a: 0, b: 100, c: 85 },
        dr: { a: 0, b: 100, c: 90 },
      };

      expect(findSmallestWidthAlignment(g, xss)).to.eql(xss.ul);
    });
  });
  describe("balance", () => {
    it("aligns a single node to the shared median value", () => {
      const xss = {
        ul: { a: 0 },
        ur: { a: 100 },
        dl: { a: 100 },
        dr: { a: 200 },
      };

      expect(balance(xss)).to.eql({ a: 100 });
    });

    it("aligns a single node to the average of different median values", () => {
      const xss = {
        ul: { a: 0 },
        ur: { a: 75 },
        dl: { a: 125 },
        dr: { a: 200 },
      };

      expect(balance(xss)).to.eql({ a: 100 });
    });

    it("balances multiple nodes", () => {
      const xss = {
        ul: { a: 0, b: 50 },
        ur: { a: 75, b: 0 },
        dl: { a: 125, b: 60 },
        dr: { a: 200, b: 75 },
      };

      expect(balance(xss)).to.eql({ a: 100, b: 55 });
    });
  });
  describe("positionX", () => {
    it("positions a single node at origin", () => {
      g.setNode("a", { rank: 0, order: 0, width: 100 });
      expect(positionX(g)).to.eql({ a: 0 });
    });

    it("positions a single node block at origin", () => {
      g.setNode("a", { rank: 0, order: 0, width: 100 });
      g.setNode("b", { rank: 1, order: 0, width: 100 });
      g.setEdge("a", "b");
      expect(positionX(g)).to.eql({ a: 0, b: 0 });
    });

    it("positions a single node block at origin even when their sizes differ", () => {
      g.setNode("a", { rank: 0, order: 0, width: 40 });
      g.setNode("b", { rank: 1, order: 0, width: 500 });
      g.setNode("c", { rank: 2, order: 0, width: 20 });
      g.setPath(["a", "b", "c"]);
      expect(positionX(g)).to.eql({ a: 0, b: 0, c: 0 });
    });

    it("centers a node if it is a predecessor of two same sized nodes", () => {
      g.graph().nodesep = 10;
      g.setNode("a", { rank: 0, order: 0, width: 20 });
      g.setNode("b", { rank: 1, order: 0, width: 50 });
      g.setNode("c", { rank: 1, order: 1, width: 50 });
      g.setEdge("a", "b");
      g.setEdge("a", "c");

      const pos = positionX(g);
      const a = pos.a;
      expect(pos).to.eql({ a: a, b: a - (25 + 5), c: a + (25 + 5) });
    });

    it("shifts blocks on both sides of aligned block", () => {
      g.graph().nodesep = 10;
      g.setNode("a", { rank: 0, order: 0, width: 50 });
      g.setNode("b", { rank: 0, order: 1, width: 60 });
      g.setNode("c", { rank: 1, order: 0, width: 70 });
      g.setNode("d", { rank: 1, order: 1, width: 80 });
      g.setEdge("b", "c");

      const pos = positionX(g);
      const b = pos.b;
      const c = b;
      expect(pos).to.eql({
        a: b - 60 / 2 - 10 - 50 / 2,
        b: b,
        c: c,
        d: c + 70 / 2 + 10 + 80 / 2,
      });
    });

    it("aligns inner segments", () => {
      g.graph().nodesep = 10;
      g.setNode("a", { rank: 0, order: 0, width: 50, dummy: true });
      g.setNode("b", { rank: 0, order: 1, width: 60 });
      g.setNode("c", { rank: 1, order: 0, width: 70 });
      g.setNode("d", { rank: 1, order: 1, width: 80, dummy: true });
      g.setEdge("b", "c");
      g.setEdge("a", "d");

      const pos = positionX(g);
      const a = pos.a;
      const d = a;
      expect(pos).to.eql({
        a: a,
        b: a + 50 / 2 + 10 + 60 / 2,
        c: d - 70 / 2 - 10 - 80 / 2,
        d: d,
      });
    });
  });
});
