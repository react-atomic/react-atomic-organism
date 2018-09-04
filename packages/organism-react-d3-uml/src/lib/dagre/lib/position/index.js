"use strict";

var util = require("../util"),
    positionX = require("./bk").positionX;

module.exports = position;
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
  var layering = util.buildLayerMatrix(g),
      rankSep = g.graph().ranksep,
      prevY = 0;
  layering.forEach( function(layer) {
    var maxHeight = Math.max(layer.map( function(v) { return g.node(v).height; }));
    layer.forEach( function(v) {
      g.node(v).y = prevY + maxHeight / 2;
    });
    prevY += maxHeight + rankSep;
  });
}

