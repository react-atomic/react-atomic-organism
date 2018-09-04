import dfs from './dfs'

const postorder = (g, vs) => {
  return dfs(g, vs, "post");
}

export default postorder
