export default topsort;
declare function topsort(g: any): any[];
declare namespace topsort {
    export { CycleException };
}
declare function CycleException(): void;
declare namespace CycleException {
    var prototype: Error;
}
