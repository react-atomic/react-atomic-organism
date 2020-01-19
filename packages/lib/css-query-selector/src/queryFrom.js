import {doc} from 'win-doc';
import {FUNCTION, STRING} from 'reshow-constant';

const arrayFrom = a => [...a];

const findHit = (all, el) => {
  let hit;
  const setHit = p => (hit = p);
  all.some(p => (p.contains(el) && !p.isSameNode(el) ? setHit(p) : false));
  return hit;
};

const queryFrom = base => {
  let doc;
  switch (typeof base) {
    case FUNCTION:
      doc = base;
      break;
    default:
      doc = () => defaultQuery.el(base);
      break;
  }

  const queryOne = sel => doc().querySelector(sel);

  const queryAll = sel => arrayFrom(doc().querySelectorAll(sel));

  const queryEl = el => (STRING === typeof el ? queryOne(el) : el);

  const _queryAncestorPolyfill = (el, ancestor) => {
    let lastHit;
    let hit;
    let all = queryAll(ancestor);
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
export {defaultQuery};
