export function addDummyNode(g: any, type: any, attrs: any, name: any): string;
export function simplify(g: any): import("../../graphlib/lib/graph").default;
export function asNonCompoundGraph(g: any): import("../../graphlib/lib/graph").default;
export function successorWeights(g: any): {};
export function predecessorWeights(g: any): {};
export function intersectRect(rect: any, point: any): {
    x: any;
    y: any;
};
export function buildLayerMatrix(g: any): any[][];
export function normalizeRanks(g: any): void;
export function removeEmptyRanks(g: any): void;
export function addBorderNode(g: any, prefix: any, rank: any, order: any, ...args: any[]): string;
export function maxRank(g: any, nodes: any): number;
export function partition(collection: any, fn: any): {
    lhs: any[];
    rhs: any[];
};
export function time(name: any, fn: any): any;
export function notime(name: any, fn: any): any;
