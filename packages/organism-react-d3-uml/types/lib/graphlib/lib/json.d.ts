declare namespace _default {
    export { write };
    export { read };
}
export default _default;
export function write(g: any): {
    options: {
        directed: any;
        multigraph: any;
        compound: any;
    };
    nodes: any;
    edges: any;
};
export function read(json: any): Graph;
import Graph from "./graph";
