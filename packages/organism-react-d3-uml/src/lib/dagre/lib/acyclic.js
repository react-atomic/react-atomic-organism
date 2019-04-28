import {uniqueId} from '../../lodash-lite'
import greedyFAS from './greedy-fas';

export {run, undo}

function run(g) {
  var fas = (g.graph().acyclicer === "greedy"
                ? greedyFAS(g, weightFn(g))
                : dfsFAS(g));
  fas.forEach( function(e) {
    var label = g.edge(e);
    g.removeEdge(e);
    label.forwardName = e.name;
    label.reversed = true;
    g.setEdge(e.w, e.v, label, uniqueId("rev"));
  });

  function weightFn(g) {
    return function(e) {
      return g.edge(e).weight;
    };
  }
}

function dfsFAS(g) {
  var fas = [],
      stack = {},
      visited = {};

  function dfs(v) {
    if (visited[v]) {
      return;
    }
    visited[v] = true;
    stack[v] = true;
    g.outEdges(v).forEach( function(e) {
      if (stack[e.w]) {
        fas.push(e);
      } else {
        dfs(e.w);
      }
    });
    delete stack[v];
  }

  g.nodes().forEach(dfs);
  return fas;
}

function undo(g) {
  g.edges().forEach( function(e) {
    var label = g.edge(e);
    if (label.reversed) {
      g.removeEdge(e);

      var forwardName = label.forwardName;
      delete label.reversed;
      delete label.forwardName;
      g.setEdge(e.w, e.v, label, forwardName);
    }
  });
}
