import * as dagre from "dagre"
import get from 'get-object-value'
import dedup from 'array.dedup'

const keys = Object.keys

const dagreAutoLayout = (nodes, conns = {}) =>
{
    const graph = new dagre.
        graphlib.
        Graph().
        setGraph({rankdir:'LR'}).
        setDefaultEdgeLabel(() => ({}))
    const nodeKeys = keys(nodes)
    if (!nodeKeys || !nodeKeys.length) {
        console.warn('[Dagre] empty node')
    }
    let nodeConns = []
    get(keys(conns), null, {}).forEach(
        key => {
            graph.setEdge(...conns[key]) 
            nodeConns.push(...conns[key])
        }
    )
    nodeConns = dedup(nodeConns)
    nodeKeys.forEach( key => 
        graph.setNode(key, {
            label: key,
            ...nodes[key].obj.getWH()
        })
    )
    dagre.layout(graph)
    const newWH = {}
    graph.nodes().forEach(v =>newWH[v]= graph.node(v))
    return newWH
}

export default dagreAutoLayout
