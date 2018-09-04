import dfs from './dfs'

const preorder = (g, vs) => {
  return dfs(g, vs, "pre");
}

export default preorder
