import {flattenDownDepth} from '../lodash-lite' 
import resolveConflicts from './resolve-conflicts'
import sort from './sort' 

    var barycenter = require("./barycenter");

export default sortSubgraph

function sortSubgraph(g, v, cg, biasRight) {
  var movable = g.children(v),
      node = g.node(v),
      bl = node ? node.borderLeft : undefined,
      br = node ? node.borderRight: undefined,
      subgraphs = {};

  if (bl) {
    movable = movable.filter( function(w) {
      return w !== bl && w !== br;
    });
  }

  var barycenters = barycenter(g, movable);
  barycenters.forEach( function(entry) {
    if (g.children(entry.v).length) {
      var subgraphResult = sortSubgraph(g, entry.v, cg, biasRight);
      subgraphs[entry.v] = subgraphResult;
      if (subgraphResult.barycenter) {
        mergeBarycenters(entry, subgraphResult);
      }
    }
  });

  var entries = resolveConflicts(barycenters, cg);
  expandSubgraphs(entries, subgraphs);

  var result = sort(entries, biasRight);

  if (bl) {
    result.vs = flattenDownDepth([bl, result.vs, br], [], 1);
    if (g.predecessors(bl).length) {
      var blPred = g.node(g.predecessors(bl)[0]),
          brPred = g.node(g.predecessors(br)[0]);
      if ('undefined' === typeof result.barycenter) {
        result.barycenter = 0;
        result.weight = 0;
      }
      result.barycenter = (result.barycenter * result.weight +
                           blPred.order + brPred.order) / (result.weight + 2);
      result.weight += 2;
    }
  }

  return result;
}

function expandSubgraphs(entries, subgraphs) {
  entries.forEach( function(entry) {
    entry.vs = flattenDownDepth(entry.vs.map(function(v) {
      if (subgraphs[v]) {
        return subgraphs[v].vs;
      }
      return v;
    }), [], 1);
  });
}

function mergeBarycenters(target, other) {
  if ('undefined' !== typeof target.barycenter) {
    target.barycenter = (target.barycenter * target.weight +
                         other.barycenter * other.weight) /
                        (target.weight + other.weight);
    target.weight += other.weight;
  } else {
    target.barycenter = other.barycenter;
    target.weight = other.weight;
  }
}
