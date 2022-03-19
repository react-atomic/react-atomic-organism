import { addDummyNode } from "./util";

const addBorderNode = (g, prop, prefix, sg, sgNode, rank) => {
  const label = { width: 0, height: 0, rank: rank, borderType: prop };
  const prev = sgNode[prop][rank - 1];
  const curr = addDummyNode(g, "border", label, prefix);
  sgNode[prop][rank] = curr;
  g.setParent(curr, sg);
  if (prev) {
    g.setEdge(prev, curr, { weight: 1 });
  }
};

const addBorderSegments = (g) => {
  const dfs = (v) => {
    const node = g.node(v);
    g.children(v)?.forEach(dfs);

    if (node.minRank) {
      node.borderLeft = [];
      node.borderRight = [];
      for (
        let rank = node.minRank, maxRank = node.maxRank + 1;
        rank < maxRank;
        ++rank
      ) {
        addBorderNode(g, "borderLeft", "_bl", v, node, rank);
        addBorderNode(g, "borderRight", "_br", v, node, rank);
      }
    }
  };

  g.children().forEach(dfs);
};

export default addBorderSegments;
