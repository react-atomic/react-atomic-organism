import get from "get-object-value";
import { KEYS } from "reshow-constant";

import {
  has,
  range,
  values,
  calMax,
  calMin,
  mapValues,
  minBy,
} from "../../../lodash-lite";
import { buildLayerMatrix } from "../util";
import { Graph } from "../graphlib";

/*
 * This module provides coordinate assignment based on Brandes and Köpf, "Fast
 * and Simple Horizontal Coordinate Assignment."
 */
export {
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
};

/*
 * Marks all edges in the graph with a type-1 conflict with the "type1Conflict"
 * property. A type-1 conflict is one where a non-inner segment crosses an
 * inner segment. An inner segment is an edge with both incident nodes marked
 * with the "dummy" property.
 *
 * This algorithm scans layer by layer, starting with the second, for type-1
 * conflicts between the current layer and the previous layer. For each layer
 * it scans the nodes from left to right until it reaches one that is incident
 * on an inner segment. It then scans predecessors to determine if they have
 * edges that cross that inner segment. At the end a final scan is done for all
 * nodes on the current rank to see if they cross the last visited inner
 * segment.
 *
 * This algorithm (safely) assumes that a dummy node will only be incident on a
 * single node in the layers being scanned.
 */
const findType1Conflicts = (g, layering) => {
  const conflicts = {};

  const visitLayer = (prevLayer, layer) => {
    // last visited node in the previous layer that is incident on an inner
    // segment.
    let k0 = 0;

    // Tracks the last node in this layer scanned for crossings with a type-1
    // segment.
    let scanPos = 0;

    const prevLayerLength = prevLayer.length;
    const lastNode = layer.slice(-1)[0];

    layer.forEach((v, i) => {
      const w = findOtherInnerSegmentNode(g, v);
      const k1 = w ? g.node(w).order : prevLayerLength;

      if (w || v === lastNode) {
        layer.slice(scanPos, i + 1).forEach((scanNode) => {
          g.predecessors(scanNode).forEach((u) => {
            const uLabel = g.node(u);
            const uPos = uLabel.order;
            if (
              (uPos < k0 || k1 < uPos) &&
              !(uLabel.dummy && g.node(scanNode).dummy)
            ) {
              addConflict(conflicts, u, scanNode);
            }
          });
        });
        scanPos = i + 1;
        k0 = k1;
      }
    });

    return layer;
  };

  layering.reduce(visitLayer);
  return conflicts;
};

function findType2Conflicts(g, layering) {
  const conflicts = {};

  function scan(south, southPos, southEnd, prevNorthBorder, nextNorthBorder) {
    let v;
    range(southEnd)
      .slice(southPos)
      .forEach(function (i) {
        v = south[i];
        if (g.node(v).dummy) {
          g.predecessors(v).forEach(function (u) {
            const uNode = g.node(u);
            if (
              uNode.dummy &&
              (uNode.order < prevNorthBorder || uNode.order > nextNorthBorder)
            ) {
              addConflict(conflicts, u, v);
            }
          });
        }
      });
  }

  function visitLayer(north, south) {
    let prevNorthPos = -1;
    let nextNorthPos;
    let southPos = 0;

    south.forEach(function (v, southLookahead) {
      if (g.node(v).dummy === "border") {
        const predecessors = g.predecessors(v);
        if (predecessors.length) {
          nextNorthPos = g.node(predecessors[0]).order;
          scan(south, southPos, southLookahead, prevNorthPos, nextNorthPos);
          southPos = southLookahead;
          prevNorthPos = nextNorthPos;
        }
      }
      scan(south, southPos, south.length, nextNorthPos, north.length);
    });

    return south;
  }

  layering.reduce(visitLayer);
  return conflicts;
}

function findOtherInnerSegmentNode(g, v) {
  if (g.node(v).dummy) {
    let result;
    g.predecessors(v).some((u) => {
      if (g.node(u).dummy) {
        result = u;
        return true;
      } else {
        return false;
      }
    });
    return result;
  }
}

const addConflict = (conflicts, v, w) => {
  if (v > w) {
    const tmp = v;
    v = w;
    w = tmp;
  }

  let conflictsV = conflicts[v];
  if (!conflictsV) {
    conflicts[v] = conflictsV = {};
  }
  conflictsV[w] = true;
};

const hasConflict = (conflicts, v, w) => {
  if (v > w) {
    const tmp = v;
    v = w;
    w = tmp;
  }
  return !!get(conflicts, [v, w]);
};

/*
 * Try to align nodes into vertical "blocks" where possible. This algorithm
 * attempts to align a node with one of its median neighbors. If the edge
 * connecting a neighbor is a type-1 conflict then we ignore that possibility.
 * If a previous node has already formed a block with a node after the node
 * we're trying to form a block with, we also ignore that possibility - our
 * blocks would be split in that scenario.
 */
const verticalAlignment = (g, layering, conflicts, neighborFn) => {
  const root = {};
  const align = {};
  const pos = {};

  // We cache the position here based on the layering because the graph and
  // layering may be out of sync. The layering matrix is manipulated to
  // generate different extreme alignments.
  layering.forEach((layer) =>
    layer.forEach((v, order) => {
      root[v] = v;
      align[v] = v;
      pos[v] = order;
    })
  );

  layering.forEach((layer) => {
    let prevIdx = -1;
    layer.forEach((v) => {
      const ws = neighborFn(v);
      if (ws.length) {
        ws.sort((l, r) => pos[l] - pos[r]);
        const mp = (ws.length - 1) / 2;
        for (let i = Math.floor(mp), il = Math.ceil(mp); i <= il; ++i) {
          const w = ws[i];
          if (
            align[v] === v &&
            prevIdx < pos[w] &&
            !hasConflict(conflicts, v, w)
          ) {
            align[w] = v;
            align[v] = root[v] = root[w];
            prevIdx = pos[w];
          }
        }
      }
    });
  });

  return { root: root, align: align };
};

const horizontalCompaction = (g, layering, root, align, reverseSep) => {
  // This portion of the algorithm differs from BK due to a number of problems.
  // Instead of their algorithm we construct a new block graph and do two
  // sweeps. The first sweep places blocks with the smallest possible
  // coordinates. The second sweep removes unused space by moving blocks to the
  // greatest coordinates without violating separation.
  const xs = {};
  const blockG = buildBlockGraph(g, layering, root, reverseSep);
  const borderType = reverseSep ? "borderLeft" : "borderRight";

  function iterate(setXsFunc, nextNodesFunc) {
    const stack = blockG.nodes();
    const visited = {};
    let elem = stack.pop();
    while (elem) {
      if (visited[elem]) {
        setXsFunc(elem);
      } else {
        visited[elem] = true;
        stack.push(elem, ...nextNodesFunc(elem));
      }

      elem = stack.pop();
    }
  }

  // First pass, assign smallest coordinates
  function pass1(elem) {
    xs[elem] = blockG
      .inEdges(elem)
      .reduce((acc, e) => Math.max(acc, xs[e.v] + blockG.edge(e)), 0);
  }

  // Second pass, assign greatest coordinates
  function pass2(elem) {
    const min = blockG
      .outEdges(elem)
      .reduce(
        (acc, e) => Math.min(acc, xs[e.w] - blockG.edge(e)),
        Number.POSITIVE_INFINITY
      );

    const node = g.node(elem);
    if (min !== Number.POSITIVE_INFINITY && node.borderType !== borderType) {
      xs[elem] = Math.max(xs[elem], min);
    }
  }

  iterate(pass1, blockG.predecessors.bind(blockG));
  iterate(pass2, blockG.successors.bind(blockG));

  // Assign x coordinates to all nodes
  values(align).forEach((v) => {
    xs[v] = xs[root[v]];
  });

  return xs;
};

function buildBlockGraph(g, layering, root, reverseSep) {
  const blockGraph = new Graph();
  const graphLabel = g.graph();
  const sepFn = sep(graphLabel.nodesep, graphLabel.edgesep, reverseSep);

  layering.forEach(function (layer) {
    let u;
    layer.forEach(function (v) {
      const vRoot = root[v];
      blockGraph.setNode(vRoot);
      if (u) {
        const uRoot = root[u];
        const prevMax = blockGraph.edge(uRoot, vRoot);
        blockGraph.setEdge(
          uRoot,
          vRoot,
          Math.max(sepFn(g, v, u), prevMax || 0)
        );
      }
      u = v;
    });
  });

  return blockGraph;
}

/*
 * Returns the alignment that has the smallest width of the given alignments.
 */
const findSmallestWidthAlignment = (g, xss) =>
  minBy(values(xss), (xs) => {
    let max = Number.NEGATIVE_INFINITY;
    let min = Number.POSITIVE_INFINITY;
    KEYS(xs).forEach((key1) => {
      let x = xs[key1];
      const halfWidth = width(g, key1) / 2;
      max = Math.max(x + halfWidth, max);
      min = Math.min(x - halfWidth, min);
    });
    return max - min;
  });

/*
 * Align the coordinates of each of the layout alignments such that
 * left-biased alignments have their minimum coordinate at the same point as
 * the minimum coordinate of the smallest width alignment and right-biased
 * alignments have their maximum coordinate at the same point as the maximum
 * coordinate of the smallest width alignment.
 */
const alignCoordinates = (xss, alignTo) => {
  const alignToVals = values(alignTo);
  const alignToMin = calMin(alignToVals);
  const alignToMax = calMax(alignToVals);

  ["u", "d"].forEach((vert) => {
    ["l", "r"].forEach((horiz) => {
      const alignment = vert + horiz;
      const xs = xss[alignment];
      let delta;
      if (xs === alignTo) {
        return;
      }
      const xsVals = values(xs);
      delta =
        horiz === "l"
          ? alignToMin - calMin(xsVals)
          : alignToMax - calMax(xsVals);
      if (delta) {
        xss[alignment] = mapValues(xs, (x) => x + delta);
      }
    });
  });
};

const balance = (xss, align) =>
  mapValues(xss.ul, (ignore, v) => {
    if (align) {
      return xss[align.toLowerCase()][v];
    } else {
      const xs = KEYS(xss)
        .map((key) => xss[key][v])
        .sort((l, r) => l - r);
      return (xs[1] + xs[2]) / 2;
    }
  });

const positionX = (g) => {
  const layering = buildLayerMatrix(g);
  const conflicts = {
    ...findType1Conflicts(g, layering),
    ...findType2Conflicts(g, layering),
  };
  const xss = {};
  let adjustedLayering;
  ["u", "d"].forEach((vert) => {
    adjustedLayering = vert === "u" ? layering : values(layering).reverse();
    ["l", "r"].forEach((horiz) => {
      if (horiz === "r") {
        adjustedLayering = adjustedLayering.map((inner) =>
          values(inner).reverse()
        );
      }
      const neighborFn = (vert === "u" ? g.predecessors : g.successors).bind(g);
      const align = verticalAlignment(
        g,
        adjustedLayering,
        conflicts,
        neighborFn
      );
      let xs = horizontalCompaction(
        g,
        adjustedLayering,
        align.root,
        align.align,
        horiz === "r"
      );
      if (horiz === "r") {
        xs = mapValues(xs, (x) => -x);
      }
      xss[vert + horiz] = xs;
    });
  });

  const smallestWidth = findSmallestWidthAlignment(g, xss);
  alignCoordinates(xss, smallestWidth);
  return balance(xss, g.graph().align);
};

const sep = (nodeSep, edgeSep, reverseSep) => (g, v, w) => {
  const vLabel = g.node(v);
  const wLabel = g.node(w);
  let sum = 0;
  let delta;

  sum += vLabel.width / 2;
  if (has(vLabel, "labelpos")) {
    switch (vLabel.labelpos.toLowerCase()) {
      case "l":
        delta = -vLabel.width / 2;
        break;
      case "r":
        delta = vLabel.width / 2;
        break;
    }
  }
  if (delta) {
    sum += reverseSep ? delta : -delta;
  }
  delta = 0;

  sum += (vLabel.dummy ? edgeSep : nodeSep) / 2;
  sum += (wLabel.dummy ? edgeSep : nodeSep) / 2;

  sum += wLabel.width / 2;
  if (has(wLabel, "labelpos")) {
    switch (wLabel.labelpos.toLowerCase()) {
      case "l":
        delta = wLabel.width / 2;
        break;
      case "r":
        delta = -wLabel.width / 2;
        break;
    }
  }
  if (delta) {
    sum += reverseSep ? delta : -delta;
  }

  return sum;
};

const width = (g, v) => g.node(v).width;
