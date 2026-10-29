export { positionX, findType1Conflicts, findType2Conflicts, findSmallestWidthAlignment, addConflict, hasConflict, verticalAlignment, horizontalCompaction, alignCoordinates, balance, };
declare const findType1Conflicts: (g: any, layering: any) => {};
declare function findType2Conflicts(g: any, layering: any): {};
declare const addConflict: (conflicts: any, v: any, w: any) => void;
declare const hasConflict: (conflicts: any, v: any, w: any) => boolean;
declare const verticalAlignment: (g: any, layering: any, conflicts: any, neighborFn: any) => {
    root: {};
    align: {};
};
declare const horizontalCompaction: (g: any, layering: any, root: any, align: any, reverseSep: any) => {};
declare const findSmallestWidthAlignment: (g: any, xss: any) => any;
declare const alignCoordinates: (xss: any, alignTo: any) => void;
declare const balance: (xss: any, align: any) => {};
declare const positionX: (g: any) => {};
