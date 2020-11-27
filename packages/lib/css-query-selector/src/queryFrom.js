import { doc } from "win-doc";
import { FUNCTION, STRING } from "reshow-constant";

const arrayFrom = (a) => (a ? [...a] : []);

const findHit = (all, el) => {
  let hit;
  const setHit = (p) => (hit = p);
  all.some((p) => (p.contains(el) && !p.isSameNode(el) ? setHit(p) : false));
  return hit;
};

const queryFrom = (base) => {
  if (!base) {
    return false;
  }
  const myBase = FUNCTION === typeof base ? base : () => defaultQuery.el(base);

  const queryOne = (sel) => myBase()?.querySelector(sel);

  const _all = (sel) => arrayFrom(myBase()?.querySelectorAll(sel));

  const queryAll = (sel) =>
    sel &&
    (sel.reduce
      ? sel.reduce(
          (accumulator, currentValue) => accumulator.concat(_all(currentValue)),
          []
        )
      : _all(sel));

  const queryEl = (el) => (STRING === typeof el ? queryOne(el) : el);

  const _queryAncestorPolyfill = (el, ancestor) => {
    let lastHit;
    let hit;
    let all = _all(ancestor);
    if (all) {
      hit = findHit(all, el);
    }
    while (hit) {
      lastHit = hit;
      all = hit.querySelectorAll(ancestor);
      if (all) {
        hit = findHit(arrayFrom(all), el);
      } else {
        break;
      }
    }
    return lastHit;
  };

  const queryAncestor = (el, ancestor) => {
    el = queryEl(el);
    if (!el) {
      console.warn("Element is empty.");
      return false;
    }
    return el.closest
      ? el.closest(ancestor)
      : _queryAncestorPolyfill(el, ancestor);
  };

  return {
    all: queryAll,
    ancestor: queryAncestor,
    el: queryEl,
    one: queryOne,
  };
};

const defaultQuery = queryFrom(doc);

export default queryFrom;
export { defaultQuery };
