//@ts-check

import callfunc from "call-func";
import { doc } from "win-doc";
import { KEYS } from "reshow-constant";

/**
 * @param {Element|function} [baseInput]
 * @param {boolean} [isPrepend]
 */
const inject =
  (baseInput, isPrepend) =>
  /**
   * @param {Element} dNode
   */
  (dNode) => {
    let base = callfunc(baseInput);
    if (base && (base.nodeName === "BODY" || base.nodeName === "HEAD")) {
      if (isPrepend && base.firstChild) {
        base.insertBefore(dNode, base.firstChild);
        return;
      } else {
        base.appendChild(dNode);
        return;
      }
    } else {
      const d = doc();
      if (!base) {
        base = d.currentScript ? d.currentScript : d.body;
      }
      const parentNode = base.parentNode;
      if (parentNode) {
        if (!isPrepend) {
          if (base.nextSibling) {
            parentNode.insertBefore(dNode, base.nextSibling);
            return;
          } else {
            parentNode.appendChild(dNode);
            return;
          }
        } else {
          parentNode.insertBefore(dNode, base);
          return;
        }
      }
      d.body.appendChild(dNode);
    }
  };

/**
 * @param {string} tag
 */
const create =
  (tag) =>
  /**
   * @param {Function} [callback]
   */
  (callback) =>
  /**
   * @param {object} attrs
   * @returns {Element|undefined}
   */
  (attrs = {}) => {
    const d = doc();
    if (d.createElement) {
      const dNode = d.createElement(tag);
      if (attrs) {
        KEYS(attrs).forEach((key) => (dNode[key] = attrs[key]));
      }
      if (callback) {
        let _isRun;
        const cb = () => {
          const readyState = { readyState: null, ...dNode }.readyState;
          if (
            !readyState ||
            -1 !== "|loaded|complete|".indexOf("|" + readyState + "|")
          ) {
            if (!_isRun) {
              _isRun = true;
              setTimeout(callback);
            }
          }
        };
        dNode.onload = cb;
        dNode.addEventListener("readystatechange", cb);
      }
      return dNode;
    }
  };

/**
 * @param {Element} dNode
 */
const remove = (dNode) => {
  if (dNode) {
    try {
      /** @type {Element} */ (dNode.parentNode).removeChild(dNode);
    } catch (e) {}
  }
};

/**
 * @param {any} v
 * @returns {HTMLScriptElement}
 */
const toScript = (v) => v;

/**
 * @param {Element|boolean} [base]
 * @param {boolean} [isPrepend]
 */
const js =
  (base, isPrepend) =>
  /**
   * @param {Function} [callback]
   */
  (callback) =>
  /**
   * @param {string} url
   * @param {object} attrs
   * @returns {HTMLScriptElement}
   */
  (url, attrs = {}) => {
    const oNode = create("script")(callback)(attrs);
    if (false !== base) {
      inject(
        /**@type {Element}*/ (base),
        isPrepend
      )(/** @type {Element} */ (oNode));
    }
    const dNode = toScript(oNode);
    dNode.src = url;
    return dNode;
  };

/**
 * @param {any} v
 * @returns {HTMLLinkElement}
 */
const toCss = (v) => v;

/**
 * @param {Element|boolean} [base]
 * @param {boolean} [isPrepend]
 */
const css =
  (base, isPrepend) =>
  /**
   * @param {Function} [callback]
   */
  (callback) =>
  /**
   * @param {string} url
   * @param {object} attrs
   * @returns {HTMLLinkElement}
   */
  (url, attrs = {}) => {
    const oNode = create("link")(callback)({
      rel: "stylesheet",
      type: "text/css",
      ...attrs,
    });
    if (false !== base) {
      inject(
        /**@type {Element}*/ (base),
        isPrepend
      )(/** @type {Element} */ (oNode));
    }
    const dNode = toCss(oNode);
    dNode.href = url;
    return dNode;
  };

export { js, css, inject, create, remove };
