const arrayFrom = a => [...a];


const queryFrom = base => {
  let doc;
  switch (typeof base) {
    case 'function':
      doc = base;
      break;
    default:
      doc = () => defaultQuery.el(base); 
      break;
  }

  const queryOne = sel => doc().querySelector(sel);

  const queryAll = sel => arrayFrom(doc().querySelectorAll(sel));

  const queryEl = el => ('string' === typeof el ? queryOne(el) : el);

  const queryAncestor = (el, ancestor) => {
    el = queryEl(el);
    const findHit = all => {
      let hit = false;
      all.some(p => {
        if (p.contains(el) && !p.isSameNode(el)) {
          hit = p;
          return true;
        } else {
          return false;
        }
      });
      return hit;
    };
    let lastHit;
    let hit;
    let all = queryAll(ancestor);
    hit = findHit(all);
    while (hit) {
      lastHit = hit;
      all = hit.querySelectorAll(ancestor);
      if (all) {
        hit = findHit(arrayFrom(all));
      } else {
        break;
      }
    }
    return lastHit;
  };
  return {
    all: queryAll,
    ancestor: queryAncestor,
    el: queryEl,
    one: queryOne,
  };
};

const defaultQuery = queryFrom(() => document);

export default queryFrom;
export {defaultQuery};
