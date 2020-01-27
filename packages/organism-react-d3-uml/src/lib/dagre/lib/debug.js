import * as util from './util';
import {Graph} from './graphlib';

/* istanbul ignore next */
const debugOrdering = g => {
  var layerMatrix = util.buildLayerMatrix(g);

  var h = new Graph({ compound: true, multigraph: true }).setGraph({});

  g.nodes().forEach( function(v) {
    h.setNode(v, { label: v });
    h.setParent(v, "layer" + g.node(v).rank);
  });

  g.edges().forEach(function(e) {
    h.setEdge(e.v, e.w, {}, e.name);
  });

  layerMatrix.forEach(function(layer, i) {
    var layerV = "layer" + i;
    h.setNode(layerV, { rank: "same" });
    layer.reduce( function(u, v) {
      h.setEdge(u, v, { style: "invis" });
      return v;
    });
  });

  return h;
}

export default debugOrdering;
