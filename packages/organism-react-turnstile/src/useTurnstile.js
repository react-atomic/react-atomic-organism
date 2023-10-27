// @ts-check

import { useEffect, useMemo, useRef } from "react";
import { js as insertJS } from "create-el";
import { win } from "win-doc";
import build from "reshow-build";
import { useTimer } from "reshow-hooks";
import callfunc from "call-func";

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
 * @param {TurnstileProps} props
 * @returns {[React.ReactElement|null, Function]}
 */
const useTurnstile = ({
  js = "https://challenges.cloudflare.com/turnstile/v0/api.js",
  onloadCallbackName = "onloadTurnstileCallback",
  component = "div",
  sitekey,
}) => {
  const isInit = /**@type React.MutableRefObject<Boolean>*/ (useRef(false));
  const lastEl = /**@type React.MutableRefObject<HTMLElement>*/ (useRef());
  const lastWidgetId = useRef();
  const [resetTokenTimer, stopTokenTimer] = useTimer(true);
  const thisWin = /**@type any*/ (win());
  useEffect(() => {
    /**
     * @see https://developers.cloudflare.com/turnstile/get-started/client-side-rendering/#explicitly-render-the-turnstile-widget
     */
    const onloadTurnstileCallback = () => {
      lastWidgetId.current = thisWin.turnstile.render(lastEl.current, {
        sitekey,
      });
      // https://community.cloudflare.com/t/implicit-turnstile-widget-doesn-t-respect-valid-token-time/425129/9
      let isInitReset = false;
      resetTokenTimer(() => {
        if (isInitReset) {
          thisWin.turnstile.reset(lastWidgetId.current);
        } else {
          isInitReset = true;
        }
      }, 60000);
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
      stopTokenTimer();
      thisWin.turnstile?.remove(lastWidgetId.current);
    };
  }, []);
  return [
    useMemo(() => build(component)({ ref: lastEl }), []),
    () => thisWin.turnstile.reset(lastWidgetId.current),
  ];
};

export default useTurnstile;
