import * as util from '../util';
import {positionX} from './bk';
import {max} from '../../../lodash-lite'

export default position;
const keys = Object.keys

function position(g) {
  g = util.asNonCompoundGraph(g);

  positionY(g);
  const arrPositionX = positionX(g)
  keys(arrPositionX).forEach( 
    key => g.node(key).x = arrPositionX[key]
  )
}

function positionY(g) {
  const layering = util.buildLayerMatrix(g);
  const rankSep = g.graph().ranksep; 
  let prevY = 0;
  layering.forEach( layer => {
    const maxHeight = max(layer.map(v => g.node(v).height));
    layer.forEach( v =>
      g.node(v).y = prevY + maxHeight / 2
    );
    prevY += maxHeight + rankSep;
  });
}

