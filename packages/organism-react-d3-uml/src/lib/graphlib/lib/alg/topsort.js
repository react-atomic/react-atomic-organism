
function topsort(g) {
  var visited = {},
      stack = {},
      results = [];

  function visit(node) {
    if ('undefined' !== typeof stack[node]) {
      throw new CycleException();
    }

    if ('undefined' === typeof visited[node]) {
      stack[node] = true;
      visited[node] = true;
      g.predecessors(node).forEach(visit);
      delete stack[node];
      results.push(node);
    }
  }

  g.sinks().forEach(visit);

  if (keys(visited).length !== g.nodeCount()) {
    throw new CycleException();
  }

  return results;
}

function CycleException() {}
CycleException.prototype = new Error(); // must be an instance of Error to pass testing
topsort.CycleException = CycleException;

export default topsort
