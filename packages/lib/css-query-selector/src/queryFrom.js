const arrayFrom = a => [...a];

const queryFrom = base => {
  if ('function' !== typeof base) {
    console.error('Query base should pass with function');
  }

  const doc = base;

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

export default queryFrom;
