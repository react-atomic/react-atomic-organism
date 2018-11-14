import queryFrom from './queryFrom';

const {all, ancestor, el, one} = queryFrom(() => document);

export default {all, ancestor, el, one};

export {
  all as queryAll,
  ancestor as queryAncestor,
  el as queryEl,
  one as queryOne,
  queryFrom,
};
