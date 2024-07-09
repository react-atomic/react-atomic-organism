// @ts-check

import { useEffect, useMemo, useRef } from "react";
import { js as insertJS } from "create-el";
import { win } from "win-doc";
import get from "get-object-value";
import build from "reshow-build";
import callfunc from "call-func";
import { useTimer, useRefUpdate } from "reshow-hooks";

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
      retry: "auto",
      "retry-interval": 500,
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
 * @property {Function=} errorCallback
 * @property {Function=} callback
 * @property {number=} callbackTimeout
 * @property {Component=} component
 */

let isInitTurnstile = false;
let isLoadTurnstile = false;
const initCallback = [];
const handleGlobalOnload = () => {
  isLoadTurnstile = true;
  initCallback.forEach((cb) => callfunc(cb.current));
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
  errorCallback,
  callback,
  callbackTimeout = 30000,
}) => {
  const isInit = /**@type React.MutableRefObject<Boolean>*/ (useRef(false));
  const isCall = /**@type React.MutableRefObject<Boolean>*/ (useRef(false));
  const lastEl = /**@type React.MutableRefObject<HTMLElement>*/ (useRef());
  const lastCallback = useRefUpdate({
    errorCallback,
    callback,
  });
  const lastTurnstile = useRef(new TurnstileAdapter());
  const thisWin = /**@type any*/ (win());
  const [runCallback, stopCallback] = useTimer();
  useEffect(() => {
    const onloadTurnstileCallback = {
      current: () => {
        const handleOnload = ({ callFrom }) => {
          stopCallback();
          isInit.current = true;
          callfunc(lastCallback.current.callback, [
            { isCall: isCall.current, callFrom },
          ]);
          isCall.current = true;
        };
        const renderOpts = {
          sitekey,
          callback: () => handleOnload({ callFrom: "load" }),
          "error-callback": () => callfunc(lastCallback.current.errorCallback),
        };
        setTimeout(() =>
          lastTurnstile.current.render(lastEl.current, renderOpts)
        );
        runCallback(
          () => handleOnload({ callFrom: "timoeout" }),
          callbackTimeout
        );
      },
    };
    if (!isInitTurnstile) {
      isInitTurnstile = true;
      initCallback.push(onloadTurnstileCallback);
      thisWin[onloadCallbackName] = handleGlobalOnload;
      const jsSrc = `${js}?onload=${onloadCallbackName}`;
      insertJS()()(jsSrc);
    } else {
      if (!isInit.current) {
        isInit.current = true;
        if (!thisWin.turnstile?.render || !isLoadTurnstile) {
          initCallback.push(onloadTurnstileCallback);
        } else {
          onloadTurnstileCallback.current();
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
