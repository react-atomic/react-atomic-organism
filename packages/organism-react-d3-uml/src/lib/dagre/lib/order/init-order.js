"use strict";

import {range} from '../lodash-lite'


export default initOrder


/*
 * Assigns an initial order value for each node by performing a DFS search
 * starting from nodes in the first rank. Nodes are assigned an order in their
 * rank as they are first visited.
 *
 * This approach comes from Gansner, et al., "A Technique for Drawing Directed
 * Graphs."
 *
 * Returns a layering matrix with an array per layer and each layer sorted by
 * the order of its nodes.
 */
function initOrder(g) {
  var visited = {},
      simpleNodes = g.nodes().filter( function(v) {
        return !g.children(v).length;
      }),
      maxRank = Math.max(...simpleNodes.map( function(v) { return g.node(v).rank; })),
      layers = range(maxRank + 1).map( function() { return []; });

  function dfs(v) {
    if (visited[v]) return;
    visited[v] = true;
    var node = g.node(v);
    layers[node.rank].push(v);
    g.successors(v).forEach( dfs);
  }

  var orderedVs = simpleNodes.sort( function(v) { return g.node(v).rank; });
  orderedVs.forEach(dfs);

  return layers;
}
