const queryFrom = base => {
  if ('function' !== typeof base) {
    console.error('query base should pass with function');
  }

  const doc = base;

  const queryOne = sel => doc().querySelector(sel);

  const queryAll = sel => Array.from(doc().querySelectorAll(sel));

  const queryEl = el => ('string' === typeof el ? queryOne(el) : el);

  const queryAncestor = (el, ancestor) => {
    el = queryEl(el);
    const findHit = all => {
      let hit = false;
      all.some(p => {
        if (p.contains(el)) {
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
        hit = findHit(Array.from(all));
      } else {
        break;
      }
    }
    return lastHit;
  };
  return {
    queryOne,
    queryAll,
    queryEl,
    queryAncestor,
  };
};

export default queryFrom;
