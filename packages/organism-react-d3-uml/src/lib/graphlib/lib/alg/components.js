
const  components = g => {
  var visited = {},
      cmpts = [],
      cmpt;

  function dfs(v) {
    if ('undefined' !== typeof visited[v]) {
      return
    }
    visited[v] = true;
    cmpt.push(v);
    g.successors(v).forEach(dfs);
    g.predecessors(v).forEach(dfs);
  }

  g.nodes().forEach( function(v) {
    cmpt = [];
    dfs(v);
    if (cmpt.length) {
      cmpts.push(cmpt);
    }
  });

  return cmpts;
}

export default components
