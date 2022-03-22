import { KEYS } from "reshow-constant";
import * as acyclic from "./acyclic";
import * as nestingGraph from "./nesting-graph";
import * as coordinateSystem from "./coordinate-system";
import * as normalize from "./normalize";
import * as util from "./util";
import rank from "./rank";
import order from "./order";
import { pick, mapValues } from "../../lodash-lite";
const { normalizeRanks, removeEmptyRanks } = util;
import parentDummyChains from "./parent-dummy-chains";
import addBorderSegments from "./add-border-segments";
import position from "./position";
import { Graph } from "./graphlib";

export default layout;

function layout(g, opts) {
  var time = opts && opts.debugTiming ? util.time : util.notime;
  time("layout", function () {
    var layoutGraph = time("  buildLayoutGraph", function () {
      return buildLayoutGraph(g);
    });
    time("  runLayout", function () {
      runLayout(layoutGraph, time);
    });
    time("  updateInputGraph", function () {
      updateInputGraph(g, layoutGraph);
    });
  });
}

function runLayout(g, time) {
  time("    makeSpaceForEdgeLabels", function () {
    makeSpaceForEdgeLabels(g);
  });
  time("    removeSelfEdges", function () {
    removeSelfEdges(g);
  });
  time("    acyclic", function () {
    acyclic.run(g);
  });
  time("    nestingGraph.run", function () {
    nestingGraph.run(g);
  });
  time("    rank", function () {
    rank(util.asNonCompoundGraph(g));
  });
  time("    injectEdgeLabelProxies", function () {
    injectEdgeLabelProxies(g);
  });
  time("    removeEmptyRanks", function () {
    removeEmptyRanks(g);
  });
  time("    nestingGraph.cleanup", function () {
    nestingGraph.cleanup(g);
  });
  time("    normalizeRanks", function () {
    normalizeRanks(g);
  });
  time("    assignRankMinMax", function () {
    assignRankMinMax(g);
  });
  time("    removeEdgeLabelProxies", function () {
    removeEdgeLabelProxies(g);
  });
  time("    normalize.run", function () {
    normalize.run(g);
  });
  time("    parentDummyChains", function () {
    parentDummyChains(g);
  });
  time("    addBorderSegments", function () {
    addBorderSegments(g);
  });
  time("    order", function () {
    order(g);
  });
  time("    insertSelfEdges", function () {
    insertSelfEdges(g);
  });
  time("    adjustCoordinateSystem", function () {
    coordinateSystem.adjust(g);
  });
  time("    position", function () {
    position(g);
  });
  time("    positionSelfEdges", function () {
    positionSelfEdges(g);
  });
  time("    removeBorderNodes", function () {
    removeBorderNodes(g);
  });
  time("    normalize.undo", function () {
    normalize.undo(g);
  });
  time("    fixupEdgeLabelCoords", function () {
    fixupEdgeLabelCoords(g);
  });
  time("    undoCoordinateSystem", function () {
    coordinateSystem.undo(g);
  });
  time("    translateGraph", function () {
    translateGraph(g);
  });
  time("    assignNodeIntersects", function () {
    assignNodeIntersects(g);
  });
  time("    reversePoints", function () {
    reversePointsForReversedEdges(g);
  });
  time("    acyclic.undo", function () {
    acyclic.undo(g);
  });
}

/*
 * Copies final layout information from the layout graph back to the input
 * graph. This process only copies whitelisted attributes from the layout graph
 * to the input graph, so it serves as a good place to determine what
 * attributes can influence layout.
 */
function updateInputGraph(inputGraph, layoutGraph) {
  inputGraph.nodes().forEach(function (v) {
    var inputLabel = inputGraph.node(v),
      layoutLabel = layoutGraph.node(v);

    if (inputLabel) {
      inputLabel.x = layoutLabel.x;
      inputLabel.y = layoutLabel.y;

      if (layoutGraph.children(v).length) {
        inputLabel.width = layoutLabel.width;
        inputLabel.height = layoutLabel.height;
      }
    }
  });

  inputGraph.edges().forEach(function (e) {
    var inputLabel = inputGraph.edge(e),
      layoutLabel = layoutGraph.edge(e);

    inputLabel.points = layoutLabel.points;
    if (layoutLabel.x) {
      inputLabel.x = layoutLabel.x;
      inputLabel.y = layoutLabel.y;
    }
  });

  inputGraph.graph().width = layoutGraph.graph().width;
  inputGraph.graph().height = layoutGraph.graph().height;
}

var graphNumAttrs = ["nodesep", "edgesep", "ranksep", "marginx", "marginy"],
  graphDefaults = { ranksep: 50, edgesep: 20, nodesep: 50, rankdir: "tb" },
  graphAttrs = ["acyclicer", "ranker", "rankdir", "align"],
  nodeNumAttrs = ["width", "height"],
  nodeDefaults = { width: 0, height: 0 },
  edgeNumAttrs = ["minlen", "weight", "width", "height", "labeloffset"],
  edgeDefaults = {
    minlen: 1,
    weight: 1,
    width: 0,
    height: 0,
    labeloffset: 10,
    labelpos: "r",
  },
  edgeAttrs = ["labelpos"];

/*
 * Constructs a new graph from the input graph, which can be used for layout.
 * This process copies only whitelisted attributes from the input graph to the
 * layout graph. Thus this function serves as a good place to determine what
 * attributes can influence layout.
 */
function buildLayoutGraph(inputGraph) {
  var g = new Graph({ multigraph: true, compound: true }),
    graph = canonicalize(inputGraph.graph());

  g.setGraph({
    ...graphDefaults,
    ...selectNumberAttrs(graph, graphNumAttrs),
    ...pick(graph, graphAttrs),
  });

  inputGraph.nodes().forEach(function (v) {
    var node = canonicalize(inputGraph.node(v));
    g.setNode(v, { ...nodeDefaults, ...selectNumberAttrs(node, nodeNumAttrs) });
    g.setParent(v, inputGraph.parent(v));
  });

  inputGraph.edges().forEach(function (e) {
    var edge = canonicalize(inputGraph.edge(e));
    g.setEdge(e, {
      ...edgeDefaults,
      ...selectNumberAttrs(edge, edgeNumAttrs),
      ...pick(edge, edgeAttrs),
    });
  });

  return g;
}

/*
 * This idea comes from the Gansner paper: to account for edge labels in our
 * layout we split each rank in half by doubling minlen and halving ranksep.
 * Then we can place labels at these mid-points between nodes.
 *
 * We also add some minimal padding to the width to push the label for the edge
 * away from the edge itself a bit.
 */
function makeSpaceForEdgeLabels(g) {
  var graph = g.graph();
  graph.ranksep /= 2;
  g.edges().forEach(function (e) {
    var edge = g.edge(e);
    edge.minlen *= 2;
    if (edge.labelpos.toLowerCase() !== "c") {
      if (graph.rankdir === "TB" || graph.rankdir === "BT") {
        edge.width += edge.labeloffset;
      } else {
        edge.height += edge.labeloffset;
      }
    }
  });
}

/*
 * Creates temporary dummy nodes that capture the rank in which each edge's
 * label is going to, if it has one of non-zero width and height. We do this
 * so that we can safely remove empty ranks while preserving balance for the
 * label's position.
 */
function injectEdgeLabelProxies(g) {
  g.edges().forEach(function (e) {
    var edge = g.edge(e);
    if (edge.width && edge.height) {
      var v = g.node(e.v),
        w = g.node(e.w),
        label = { rank: (w.rank - v.rank) / 2 + v.rank, e: e };
      util.addDummyNode(g, "edge-proxy", label, "_ep");
    }
  });
}

function assignRankMinMax(g) {
  var maxRank = 0;
  g.nodes().forEach(function (v) {
    var node = g.node(v);
    if (node.borderTop) {
      node.minRank = g.node(node.borderTop).rank;
      node.maxRank = g.node(node.borderBottom).rank;
      maxRank = Math.max(maxRank, node.maxRank);
    }
  });
  g.graph().maxRank = maxRank;
}

function removeEdgeLabelProxies(g) {
  g.nodes().forEach(function (v) {
    var node = g.node(v);
    if (node.dummy === "edge-proxy") {
      g.edge(node.e).labelRank = node.rank;
      g.removeNode(v);
    }
  });
}

function translateGraph(g) {
  var minX = Number.POSITIVE_INFINITY,
    maxX = 0,
    minY = Number.POSITIVE_INFINITY,
    maxY = 0,
    graphLabel = g.graph(),
    marginX = graphLabel.marginx || 0,
    marginY = graphLabel.marginy || 0;

  function getExtremes(attrs) {
    const x = attrs.x;
    const y = attrs.y;
    const w = attrs.width;
    const h = attrs.height;
    minX = Math.min(minX, x - w / 2);
    maxX = Math.max(maxX, x + w / 2);
    minY = Math.min(minY, y - h / 2);
    maxY = Math.max(maxY, y + h / 2);
  }

  g.nodes().forEach((v) => {
    getExtremes(g.node(v));
  });

  g.edges().forEach(function (e) {
    var edge = g.edge(e);
    if (edge && edge.x) {
      getExtremes(edge);
    }
  });

  minX -= marginX;
  minY -= marginY;

  g.nodes().forEach(function (v) {
    var node = g.node(v);
    node.x -= minX;
    node.y -= minY;
  });

  g.edges().forEach(function (e) {
    var edge = g.edge(e);
    edge.points.forEach(function (p) {
      p.x -= minX;
      p.y -= minY;
    });
    if (edge.x) {
      edge.x -= minX;
    }
    if (edge.y) {
      edge.y -= minY;
    }
  });

  graphLabel.width = maxX - minX + marginX;
  graphLabel.height = maxY - minY + marginY;
}

function assignNodeIntersects(g) {
  g.edges().forEach((e) => {
    const edge = g.edge(e);
    const nodeV = g.node(e.v);
    const nodeW = g.node(e.w);
    let p1;
    let p2;
    if (!edge.points) {
      edge.points = [];
      p1 = nodeW;
      p2 = nodeV;
    } else {
      p1 = edge.points[0];
      p2 = edge.points[edge.points.length - 1];
    }
    edge.points.unshift(util.intersectRect(nodeV, p1));
    edge.points.push(util.intersectRect(nodeW, p2));
  });
}

function fixupEdgeLabelCoords(g) {
  g.edges().forEach(function (e) {
    var edge = g.edge(e);
    if (edge.x) {
      if (edge.labelpos === "l" || edge.labelpos === "r") {
        edge.width -= edge.labeloffset;
      }
      switch (edge.labelpos) {
        case "l":
          edge.x -= edge.width / 2 + edge.labeloffset;
          break;
        case "r":
          edge.x += edge.width / 2 + edge.labeloffset;
          break;
      }
    }
  });
}

function reversePointsForReversedEdges(g) {
  g.edges().forEach(function (e) {
    var edge = g.edge(e);
    if (edge.reversed) {
      edge.points.reverse();
    }
  });
}

function removeBorderNodes(g) {
  g.nodes().forEach(function (v) {
    if (g.children(v).length) {
      var node = g.node(v),
        t = g.node(node.borderTop),
        b = g.node(node.borderBottom),
        l = g.node(node.borderLeft.slice(-1)[0]),
        r = g.node(node.borderRight.slice(-1)[0]);

      node.width = Math.abs(r.x - l.x);
      node.height = Math.abs(b.y - t.y);
      node.x = l.x + node.width / 2;
      node.y = t.y + node.height / 2;
    }
  });

  g.nodes().forEach(function (v) {
    if (g.node(v).dummy === "border") {
      g.removeNode(v);
    }
  });
}

function removeSelfEdges(g) {
  g.edges().forEach(function (e) {
    if (e.v === e.w) {
      var node = g.node(e.v);
      if (!node.selfEdges) {
        node.selfEdges = [];
      }
      node.selfEdges.push({ e: e, label: g.edge(e) });
      g.removeEdge(e);
    }
  });
}

function insertSelfEdges(g) {
  var layers = util.buildLayerMatrix(g);
  layers.forEach(function (layer) {
    var orderShift = 0;
    layer.forEach(function (v, i) {
      var node = g.node(v);
      node.order = i + orderShift;
      if (node.selfEdges) {
        node.selfEdges.forEach(function (selfEdge) {
          util.addDummyNode(
            g,
            "selfedge",
            {
              width: selfEdge.label.width,
              height: selfEdge.label.height,
              rank: node.rank,
              order: i + ++orderShift,
              e: selfEdge.e,
              label: selfEdge.label,
            },
            "_se"
          );
        });
      }
      delete node.selfEdges;
    });
  });
}

function positionSelfEdges(g) {
  g.nodes().forEach(function (v) {
    var node = g.node(v);
    if (node.dummy === "selfedge") {
      var selfNode = g.node(node.e.v),
        x = selfNode.x + selfNode.width / 2,
        y = selfNode.y,
        dx = node.x - x,
        dy = selfNode.height / 2;
      g.setEdge(node.e, node.label);
      g.removeNode(v);
      node.label.points = [
        { x: x + (2 * dx) / 3, y: y - dy },
        { x: x + (5 * dx) / 6, y: y - dy },
        { x: x + dx, y: y },
        { x: x + (5 * dx) / 6, y: y + dy },
        { x: x + (2 * dx) / 3, y: y + dy },
      ];
      node.label.x = node.x;
      node.label.y = node.y;
    }
  });
}

function selectNumberAttrs(obj, attrs) {
  return mapValues(pick(obj, attrs), Number);
}

function canonicalize(attrs) {
  var newAttrs = {};
  KEYS(attrs || {}).forEach((key) => (newAttrs[key.toLowerCase()] = attrs[key]));
  return newAttrs;
}
