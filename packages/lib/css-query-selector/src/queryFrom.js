//@ts-check

import { doc } from "win-doc";
import { FUNCTION, STRING } from "reshow-constant";

/**
 * @param {any} a
 * @returns {any[]}
 */
const arrayFrom = (a) => (a ? [...a] : []);

/**
 * @param {HTMLElement[]} all
 * @param {HTMLElement} el
 * @returns {HTMLElement=}
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
 * @returns {QueryUtil=}
 */
export default function queryFrom(base) {
  if (!base) {
    return;
  }

  /**
   * @type {CallableFunction}
   * @returns {HTMLElement}
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
   * @returns {HTMLElement[]|void}
   */
  const queryAll = (sel) => {
    if (sel) {
      if (STRING === typeof sel) {
        return _all(/** @type {string}*/ (sel));
      } else {
        return /** @type {string[]}*/ (sel).reduce(
          /**
           * @param {HTMLElement[]} accumulator
           * @param {string} currentValue
           */
          (accumulator, currentValue) => accumulator.concat(_all(currentValue)),
          []
        );
      }
    }
  };

  /**
   * @param {string|HTMLElement} el
   * @returns {HTMLElement}
   */
  const queryEl = (el) =>
    STRING === typeof el
      ? queryOne(/** @type {string}*/ (el))
      : /** @type {HTMLElement}*/ (el);

  /**
   * @param {HTMLElement} el
   * @param {string} ancestor
   * @returns {Element=}
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
   * @returns {Element|undefined|null|boolean}
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
export const defaultQuery = queryFrom(doc);
