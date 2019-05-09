import get from 'get-object-value'
import dedup from 'array.dedup'
import * as dagre from "./lib/dagre"

const keys = Object.keys

const toInt = d => parseInt(d, 10)

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
    const nodeNoConns = []
    nodeKeys.forEach( key => { 
        if (-1 !== nodeConns.indexOf(toInt(key))) {
            graph.setNode(key, {
                label: key,
                ...nodes[key].getWH()
            })
        } else {
            nodeNoConns.push(key)
        }
    })
    dagre.layout(graph)
    const newWH = {}
    graph.nodes().forEach(key =>newWH[key]= graph.node(key))
    if (nodeNoConns.length) {
        let noConnStart = 1 
        nodeNoConns.forEach(key => {
            newWH[key] = {x: 10, y: noConnStart*20}
            noConnStart++
        })
    }
    return newWH
}

export default dagreAutoLayout
