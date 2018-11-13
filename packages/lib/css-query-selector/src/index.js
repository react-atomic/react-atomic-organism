import queryFrom from './queryFrom';

const {queryAll, queryAncestor, queryEl, queryOne} = queryFrom(() => document);

export default {
  all: queryAll,
  ancestor: queryAncestor,
  el: queryEl,
  one: queryOne,
};

export {queryAll, queryAncestor, queryEl, queryOne, queryFrom};
