export default networkSimplex;
export { initLowLimValues, initCutValues, calcCutValue, leaveEdge, enterEdge, exchangeEdges, };
declare function networkSimplex(g: any): void;
declare function initCutValues(t: any, g: any): void;
declare function calcCutValue(t: any, g: any, child: any): number;
declare function initLowLimValues(tree: any, root: any): void;
declare function leaveEdge(tree: any): any;
declare function enterEdge(t: any, g: any, edge: any): any;
declare function exchangeEdges(t: any, g: any, e: any, f: any): void;
