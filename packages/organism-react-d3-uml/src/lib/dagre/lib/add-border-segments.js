import * as util from "./util";
export default addBorderSegments;

function addBorderSegments(g) {
  function dfs(v) {
    var children = g.children(v),
      node = g.node(v);
    if (children.length) {
      children.forEach(dfs);
    }

    if (node.minRank) {
      node.borderLeft = [];
      node.borderRight = [];
      for (
        var rank = node.minRank, maxRank = node.maxRank + 1;
        rank < maxRank;
        ++rank
      ) {
        addBorderNode(g, "borderLeft", "_bl", v, node, rank);
        addBorderNode(g, "borderRight", "_br", v, node, rank);
      }
    }
  }

  g.children().forEach(dfs);
}

function addBorderNode(g, prop, prefix, sg, sgNode, rank) {
  var label = { width: 0, height: 0, rank: rank, borderType: prop },
    prev = sgNode[prop][rank - 1],
    curr = util.addDummyNode(g, "border", label, prefix);
  sgNode[prop][rank] = curr;
  g.setParent(curr, sg);
  if (prev) {
    g.setEdge(prev, curr, { weight: 1 });
  }
}
