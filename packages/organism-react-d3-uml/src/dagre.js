import get from "get-object-value";
import dedup from "array.dedup";
import nonWorker from "non-worker";
import { KEYS } from "reshow-constant";
import * as dagre from "./lib/dagre";

const oNonWorker = new nonWorker((e) => {
  const { nodes, conns, queueId } = get(e, ["data"]);
  const nextXY = dagreAutoLayout(nodes, conns);
  post({ nextXY, queueId });
});
const post = (payload) => oNonWorker.post.call(this, payload);

export default oNonWorker;

const toInt = (d) => parseInt(d, 10);
const dagreAutoLayout = (nodes, conns = {}) => {
  const graph = new dagre.graphlib.Graph()
    .setGraph({ rankdir: "LR" })
    .setDefaultEdgeLabel(() => ({}));
  if (!nodes || !nodes.length) {
    console.warn("[Dagre] empty node");
  }
  let nodeConns = [];
  KEYS(conns || {}).forEach((key) => {
    graph.setEdge(...conns[key]);
    nodeConns.push(...conns[key]);
  });
  nodeConns = dedup(nodeConns);
  const nodeNoConns = [];

  nodes.forEach((node) => {
    const key = toInt(node.key);
    if (-1 !== nodeConns.indexOf(key)) {
      graph.setNode(key, {
        label: key,
        ...node,
      });
    } else {
      nodeNoConns.push(key);
    }
  });
  dagre.layout(graph);
  const nextXY = {};
  graph.nodes().forEach((key) => (nextXY[key] = graph.node(key)));
  if (nodeNoConns.length) {
    let noConnStart = 1;
    nodeNoConns.forEach((key) => {
      nextXY[key] = { x: 10, y: ++noConnStart * 20 };
    });
  }
  return nextXY;
};
