//@ts-check

import { doc } from "win-doc";
import { FUNCTION, STRING, castToArr, castToStr } from "reshow-constant";

/**
 * @param {any} a
 * @returns {any[]}
 */
const arrayFrom = (a) => (a ? [...a] : []);

/**
 * @param {any} el
 * @returns {HTMLElement}
 */
const toEl = (el) => el;

/**
 * @param {HTMLElement[]} all
 * @param {HTMLElement} el
 * @returns {HTMLElement}
 */
const findHit = (all, el) => {
  let hit;

  /**
   * @param {HTMLElement} p
   */
  const setHit = (p) => (hit = p);
  all.some((p) => (p.contains(el) && !p.isSameNode(el) ? setHit(p) : false));
  return hit;
};

/**
 * @typedef {object} QueryUtil
 * @property {Function} all
 * @property {Function} ancestor
 * @property {Function} el
 * @property {Function} one
 */

/**
 * @param {any} base
 * @returns {QueryUtil}
 */
const queryFrom = (base) => {
  if (!base) {
    return;
  }

  /**
   * @type {null|CallableFunction}
   */
  const myBase = FUNCTION === typeof base ? base : () => defaultQuery?.el(base);

  /**
   * @param {string} sel
   * @returns {HTMLElement}
   */
  const queryOne = (sel) => myBase()?.querySelector(sel);

  /**
   * @param {string} sel
   * @returns {HTMLElement[]}
   */
  const _all = (sel) => arrayFrom(myBase()?.querySelectorAll(sel));

  /**
   * @param {string|string[]} sel
   * @returns {HTMLElement[]}
   */
  const queryAll = (sel) =>
    sel &&
    (STRING === typeof sel
      ? _all(castToStr(sel))
      : castToArr(sel).reduce(
          /**
           * @param {HTMLElement[]} accumulator
           * @param {string} currentValue
           */
          (accumulator, currentValue) => accumulator.concat(_all(currentValue)),
          []
        ));

  /**
   * @param {string|HTMLElement} el
   * @returns {HTMLElement}
   */
  const queryEl = (el) =>
    STRING === typeof el ? queryOne(castToStr(el)) : toEl(el);

  /**
   * @param {HTMLElement} el
   * @param {string} ancestor
   * @returns {Element|boolean}
   */
  const _queryAncestorPolyfill = (el, ancestor) => {
    let lastHit;
    let hit;
    let all = _all(ancestor);
    if (all) {
      hit = findHit(all, el);
    }
    while (hit) {
      lastHit = hit;
      const all = hit.querySelectorAll(ancestor);
      if (all) {
        hit = findHit(arrayFrom(all), el);
      } else {
        break;
      }
    }
    return lastHit;
  };

  /**
   * @param {HTMLElement} el
   * @param {string} ancestor
   * @returns {Element|boolean}
   */
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
