export default networkSimplex;
declare function networkSimplex(g: any): void;
export function initLowLimValues(tree: any, root: any, ...args: any[]): void;
export function initCutValues(t: any, g: any): void;
export function calcCutValue(t: any, g: any, child: any): number;
export function leaveEdge(tree: any): undefined;
export function enterEdge(t: any, g: any, edge: any): any;
export function exchangeEdges(t: any, g: any, e: any, f: any): void;
