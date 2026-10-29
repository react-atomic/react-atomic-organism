export { addDummyNode, simplify, asNonCompoundGraph, successorWeights, predecessorWeights, intersectRect, buildLayerMatrix, normalizeRanks, removeEmptyRanks, addBorderNode, maxRank, partition, time, notime, };
declare function addDummyNode(g: any, type: any, attrs: any, name: any): any;
declare function simplify(g: any): any;
declare function asNonCompoundGraph(g: any): any;
declare function successorWeights(g: any): {};
declare function predecessorWeights(g: any): {};
declare function intersectRect(rect: any, point: any): {
    x: any;
    y: any;
};
declare function buildLayerMatrix(g: any): any[][];
declare function normalizeRanks(g: any): void;
declare function removeEmptyRanks(g: any): void;
declare function addBorderNode(g: any, prefix: any, rank: any, order: any): any;
declare function maxRank(g: any, nodes: any): number;
declare function partition(collection: any, fn: any): {
    lhs: any[];
    rhs: any[];
};
declare function time(name: any, fn: any): any;
declare function notime(name: any, fn: any): any;
