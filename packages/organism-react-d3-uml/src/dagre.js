import * as dagre from "dagre"

const keys = Object.keys

const dagreAutoLayout = nodes =>
{
    const graph = new dagre.graphlib.Graph()
    graph.setGraph({})
    graph.setDefaultEdgeLabel(() => ({}))
    console.log(nodes)
    const nodeKeys = keys(nodes)
    if (!nodeKeys || !nodeKeys.length) {
        console.warn('[Dagre] empty node')
    }
    nodeKeys.forEach( key => graph.setNode(key, {
        label: key,
        ...nodes[key].obj.getWH()
    }))
}

export default dagreAutoLayout
