import dijkstra from './dijkstra'

const keys = Object.keys

const dijkstraAll = (g, weightFunc, edgeFunc) => {
  const result = {}
  const nodes = g.nodes()
  keys(nodes).forEach(key => {
    const value = nodes[key]
    result[value] = dijkstra(g, value, weightFunc, edgeFunc)
  }) 
  return result
}

export default dijkstraAll
