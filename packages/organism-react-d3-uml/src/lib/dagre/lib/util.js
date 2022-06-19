import {
  range,
  uniqueId,
  zipObject,
  now,
  calMax,
  calMin,
} from "../../lodash-lite";
import { Graph } from "./graphlib";

export {
  addDummyNode,
  simplify,
  asNonCompoundGraph,
  successorWeights,
  predecessorWeights,
  intersectRect,
  buildLayerMatrix,
  normalizeRanks,
  removeEmptyRanks,
  addBorderNode,
  maxRank,
  partition,
  time,
  notime,
};

/*
 * Adds a dummy node to the graph and return v.
 */
function addDummyNode(g, type, attrs, name) {
  var v;
  do {
    v = uniqueId(name);
  } while (g.hasNode(v));

  attrs.dummy = type;
  g.setNode(v, attrs);
  return v;
}

/*
 * Returns a new graph with only simple edges. Handles aggregation of data
 * associated with multi-edges.
 */
function simplify(g) {
  var simplified = new Graph().setGraph(g.graph());
  g.nodes().forEach(function (v) {
    simplified.setNode(v, g.node(v));
  });
  g.edges().forEach(function (e) {
    var simpleLabel = simplified.edge(e.v, e.w) || { weight: 0, minlen: 1 },
      label = g.edge(e);
    simplified.setEdge(e.v, e.w, {
      weight: simpleLabel.weight + label.weight,
      minlen: Math.max(simpleLabel.minlen, label.minlen),
    });
  });
  return simplified;
}

function asNonCompoundGraph(g) {
  var simplified = new Graph({ multigraph: g.isMultigraph() }).setGraph(
    g.graph()
  );
  g.nodes().forEach(function (v) {
    if (!g.children(v).length) {
      simplified.setNode(v, g.node(v));
    }
  });
  g.edges().forEach(function (e) {
    simplified.setEdge(e, g.edge(e));
  });
  return simplified;
}

function successorWeights(g) {
  var weightMap = g.nodes().map(function (v) {
    var sucs = {};
    g.outEdges(v).forEach(function (e) {
      sucs[e.w] = (sucs[e.w] || 0) + g.edge(e).weight;
    });
    return sucs;
  });
  return zipObject(g.nodes(), weightMap);
}

function predecessorWeights(g) {
  var weightMap = g.nodes().map(function (v) {
    var preds = {};
    g.inEdges(v).forEach(function (e) {
      preds[e.v] = (preds[e.v] || 0) + g.edge(e).weight;
    });
    return preds;
  });
  return zipObject(g.nodes(), weightMap);
}

/*
 * Finds where a line starting at point ({x, y}) would intersect a rectangle
 * ({x, y, width, height}) if it were pointing at the rectangle's center.
 */
function intersectRect(rect, point) {
  var x = rect.x;
  var y = rect.y;

  // Rectangle intersection algorithm from:
  // http://math.stackexchange.com/questions/108113/find-edge-between-two-boxes
  var dx = point.x - x;
  var dy = point.y - y;
  var w = rect.width / 2;
  var h = rect.height / 2;

  if (!dx && !dy) {
    throw new Error(
      "Not possible to find intersection inside of the rectangle"
    );
  }

  var sx, sy;
  if (Math.abs(dy) * w > Math.abs(dx) * h) {
    // Intersection is top or bottom of rect.
    if (dy < 0) {
      h = -h;
    }
    sx = (h * dx) / dy;
    sy = h;
  } else {
    // Intersection is left or right of rect.
    if (dx < 0) {
      w = -w;
    }
    sx = w;
    sy = (w * dy) / dx;
  }

  return { x: x + sx, y: y + sy };
}

/*
 * Given a DAG with each node assigned "rank" and "order" properties, this
 * function will produce a matrix with the ids of each node.
 */
function buildLayerMatrix(g) {
  var layering = range(maxRank(g) + 1).map(function () {
    return [];
  });
  g.nodes().forEach(function (v) {
    var node = g.node(v),
      rank = node.rank;
    if ("undefined" !== typeof rank) {
      layering[rank][node.order] = v;
    }
  });
  return layering;
}

/*
 * Adjusts the ranks for all nodes in the graph such that all nodes v have
 * rank(v) >= 0 and at least one node w has rank(w) = 0.
 */
function normalizeRanks(g) {
  var offset = calMin(g.nodes().map((v) => g.node(v).rank));
  g.nodes().forEach(function (v) {
    var node = g.node(v);
    if ("undefined" !== typeof node.rank) {
      node.rank -= offset;
    }
  });
}

function removeEmptyRanks(g) {
  // Ranks may not start at 0, so we need to offset them
  var offset = calMin(g.nodes().map((v) => g.node(v).rank));

  var layers = [];
  g.nodes().forEach(function (v) {
    var rank = g.node(v).rank - offset;
    if (!layers[rank]) {
      layers[rank] = [];
    }
    layers[rank].push(v);
  });

  var delta = 0,
    nodeRankFactor = g.graph().nodeRankFactor;
  layers.forEach(function (vs, i) {
    if ("undefined" === typeof vs && i % nodeRankFactor !== 0) {
      --delta;
    } else if (delta) {
      vs.forEach(function (v) {
        g.node(v).rank += delta;
      });
    }
  });
}

function addBorderNode(g, prefix, rank, order) {
  var node = {
    width: 0,
    height: 0,
  };
  if (arguments.length >= 4) {
    node.rank = rank;
    node.order = order;
  }
  return addDummyNode(g, "border", node, prefix);
}

function maxRank(g, nodes) {
  if (!nodes) {
    nodes = g.nodes();
  }
  const arr = nodes.map(function (v) {
    const rank = g.node(v).rank;
    if ("undefined" !== typeof rank) {
      return rank;
    }
  });
  if (!arr.length) {
    return 0;
  }
  return calMax(arr);
}

/*
 * Partition a collection into two groups: `lhs` and `rhs`. If the supplied
 * function returns true for an entry it goes into `lhs`. Otherwise it goes
 * into `rhs.
 */
function partition(collection, fn) {
  var result = { lhs: [], rhs: [] };
  collection.forEach(function (value) {
    if (fn(value)) {
      result.lhs.push(value);
    } else {
      result.rhs.push(value);
    }
  });
  return result;
}

/*
 * Returns a new function that wraps `fn` with a timer. The wrapper logs the
 * time it takes to execute the function.
 */
function time(name, fn) {
  var start = now();
  try {
    return fn();
  } finally {
    console.log(name + " time: " + (now() - start) + "ms");
  }
}

function notime(name, fn) {
  return fn();
}
