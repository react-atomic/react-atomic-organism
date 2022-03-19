import { uniqueId } from "../../lodash-lite";
import greedyFAS from "./greedy-fas";

const dfsFAS = (g) => {
  const fas = [];
  const stack = {};
  const visited = {};

  const dfs = (v) => {
    if (visited[v]) {
      return;
    }
    visited[v] = true;
    stack[v] = true;
    g.outEdges(v).forEach((e) => {
      if (stack[e.w]) {
        fas.push(e);
      } else {
        dfs(e.w);
      }
    });
    delete stack[v];
  };

  g.nodes().forEach(dfs);
  return fas;
};

const run = (g) => {
  const weightFn = (g) => (e) => g.edge(e).weight;
  const fas =
    g.graph().acyclicer === "greedy" ? greedyFAS(g, weightFn(g)) : dfsFAS(g);
  fas.forEach((e) => {
    const label = g.edge(e);
    g.removeEdge(e);
    label.forwardName = e.name;
    label.reversed = true;
    g.setEdge(e.w, e.v, label, uniqueId("rev"));
  });
};

const undo = (g) => {
  g.edges().forEach((e) => {
    var label = g.edge(e);
    if (label.reversed) {
      g.removeEdge(e);

      var forwardName = label.forwardName;
      delete label.reversed;
      delete label.forwardName;
      g.setEdge(e.w, e.v, label, forwardName);
    }
  });
};

export { run, undo };
