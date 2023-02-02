export default topsort;
declare function topsort(g: any): any[];
declare namespace topsort {
    export { CycleException };
}
declare function CycleException(): void;
