import { isUndefined } from "../../lodash-lite";
import Graph from "./graph";

function writeNodes(g) {
  return g.nodes().map(function (v) {
    var nodeValue = g.node(v);
    var parent = g.parent(v);
    var node = { v: v };
    if (!isUndefined(nodeValue)) {
      node.value = nodeValue;
    }
    if (!isUndefined(parent)) {
      node.parent = parent;
    }
    return node;
  });
}

function writeEdges(g) {
  return g.edges().map(function (e) {
    var edgeValue = g.edge(e);
    var edge = { v: e.v, w: e.w };
    if (!isUndefined(e.name)) {
      edge.name = e.name;
    }
    if (!isUndefined(edgeValue)) {
      edge.value = edgeValue;
    }
    return edge;
  });
}

const write = (g) => {
  var json = {
    options: {
      directed: g.isDirected(),
      multigraph: g.isMultigraph(),
      compound: g.isCompound(),
    },
    nodes: writeNodes(g),
    edges: writeEdges(g),
  };
  if (!isUndefined(g.graph())) {
    json.value = { ...g.graph() };
  }
  return json;
};

const read = (json) => {
  var g = new Graph(json.options).setGraph(json.value);
  json.nodes.forEach(function (entry) {
    g.setNode(entry.v, entry.value);
    if (entry.parent) {
      g.setParent(entry.v, entry.parent);
    }
  });
  json.edges.forEach(function (entry) {
    g.setEdge({ v: entry.v, w: entry.w, name: entry.name }, entry.value);
  });
  return g;
};

export { write, read };
export default { write, read };
