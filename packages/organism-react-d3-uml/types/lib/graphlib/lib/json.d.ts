declare const write: (g: any) => {
    options: {
        directed: any;
        multigraph: any;
        compound: any;
    };
    nodes: any;
    edges: any;
};
declare const read: (json: any) => any;
export { write, read };
declare const _default: {
    write: typeof write;
    read: typeof read;
};
export default _default;
