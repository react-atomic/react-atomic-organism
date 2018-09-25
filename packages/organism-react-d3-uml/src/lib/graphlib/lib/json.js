import Graph from './graph'

export {write, read};

function write(g) {
  var json = {
    options: {
      directed: g.isDirected(),
      multigraph: g.isMultigraph(),
      compound: g.isCompound()
    },
    nodes: writeNodes(g),
    edges: writeEdges(g)
  };
  if ('undefined' !== typeof g.graph()) {
    json.value = {...g.graph()};
  }
  return json;
}

function writeNodes(g) {
  return g.nodes().map( function(v) {
    var nodeValue = g.node(v),
        parent = g.parent(v),
        node = { v: v };
    if ('undefined' !== typeof nodeValue) {
      node.value = nodeValue;
    }
    if ('undefined' !== typeof parent) {
      node.parent = parent;
    }
    return node;
  });
}

function writeEdges(g) {
  return g.edges().map( function(e) {
    var edgeValue = g.edge(e),
        edge = { v: e.v, w: e.w };
    if ('undefined' !== typeof e.name) {
      edge.name = e.name;
    }
    if ('undefined' !== typeof edgeValue) {
      edge.value = edgeValue;
    }
    return edge;
  });
}

function read(json) {
  var g = new Graph(json.options).setGraph(json.value);
  json.nodes.forEach( function(entry) {
    g.setNode(entry.v, entry.value);
    if (entry.parent) {
      g.setParent(entry.v, entry.parent);
    }
  });
  json.edges.forEach( function(entry) {
    g.setEdge({ v: entry.v, w: entry.w, name: entry.name }, entry.value);
  });
  return g;
}
