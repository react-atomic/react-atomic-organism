// @ts-check

import { useEffect, useMemo, useRef } from "react";
import { js as insertJS } from "create-el";
import { win } from "win-doc";
import get from "get-object-value";
import build from "reshow-build";
import callfunc from "call-func";

class TurnstileAdapter {
  /**
   * @type {string=}
   */
  widgetId;

  /**
   * @param {string} func
   * @param {any[]=} args
   */
  call(func, args) {
    const turnstile = get(win(), ["turnstile"]);
    try {
      return callfunc(get(turnstile, [func]), args, turnstile);
    } catch (e) {}
  }

  /**
   * Render
   *
   * @see https://developers.cloudflare.com/turnstile/get-started/client-side-rendering/#explicitly-render-the-turnstile-widget
   * @see https://developers.cloudflare.com/turnstile/get-started/client-side-rendering/#reset-a-widget
   *
   * @param {HTMLElement} el
   * @param {any} options
   */
  render(el, options) {
    const nextOptions = {
      "refresh-expired": "auto",
      ...options,
    };
    this.widgetId = this.call("render", [el, nextOptions]);
  }

  /**
   * Reset
   *
   * @see https://community.cloudflare.com/t/implicit-turnstile-widget-doesn-t-respect-valid-token-time/425129/9
   */
  reset() {
    if (this.widgetId) {
      this.call("reset", [this.widgetId]);
    }
  }

  remove() {
    if (this.widgetId) {
      this.widgetId = undefined;
      this.call("remove", [this.widgetId]);
    }
  }
}

/**
 * @typedef {import("reshow-build").Component} Component
 */

/**
 * @typedef {object} TurnstileProps
 * @property {string=} js
 * @property {string=} onloadCallbackName
 * @property {string=} inputWrapperId
 * @property {string=} sitekey
 * @property {Component=} component
 */

let isLoadTurnstile = false;
const initCallback = [];
const handleOnload = () => {
  initCallback.forEach((cb) => callfunc(cb));
};

/**
 * @callback CleanTurnstile
 * @param {boolean} [bRemove]
 */

/**
 * @param {TurnstileProps} props
 * @returns {[React.ReactElement|null, CleanTurnstile]}
 */
const useTurnstile = ({
  js = "https://challenges.cloudflare.com/turnstile/v0/api.js",
  onloadCallbackName = "onloadTurnstileCallback",
  component = "div",
  sitekey,
}) => {
  const isInit = /**@type React.MutableRefObject<Boolean>*/ (useRef(false));
  const lastEl = /**@type React.MutableRefObject<HTMLElement>*/ (useRef());
  const lastTurnstile = useRef(new TurnstileAdapter());
  const thisWin = /**@type any*/ (win());
  useEffect(() => {
    const onloadTurnstileCallback = () => {
      lastTurnstile.current.render(lastEl.current, {
        sitekey,
      });
    };
    if (!isLoadTurnstile) {
      thisWin.onloadTurnstileCallback = handleOnload;
      const jsSrc = `${js}?onload=${onloadCallbackName}`;
      insertJS()()(jsSrc);
      isLoadTurnstile = true;
    } else {
      if (!isInit.current) {
        isInit.current = true;
        if (!thisWin.turnstile?.render) {
          initCallback.push(onloadTurnstileCallback);
        } else {
          onloadTurnstileCallback();
        }
      }
    }
    return () => {
      lastTurnstile.current.remove();
    };
  }, []);
  return [
    useMemo(() => build(component)({ ref: lastEl }), []),
    (bRemove) =>
      bRemove ? lastTurnstile.current.remove() : lastTurnstile.current.reset(),
  ];
};

export default useTurnstile;
