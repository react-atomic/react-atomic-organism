import queryFrom, { defaultQuery } from "./queryFrom";

defaultQuery.from = queryFrom;

export default defaultQuery;

const {
  all: queryAll,
  ancestor: queryAncestor,
  el: queryEl,
  one: queryOne,
} = defaultQuery;

export { queryAll, queryAncestor, queryEl, queryOne, queryFrom };
