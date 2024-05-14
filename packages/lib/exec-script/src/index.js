// @ts-check
import { js, create } from "create-el";
import { win, doc } from "win-doc";
import { FUNCTION, STRING, SCRIPT } from "reshow-constant";
import callfunc from "call-func";
import { getSN } from "get-random-id";

let lastScript;
const getLastScript = () => lastScript;

const handleScriptOnload =
  ({ oWin, errCb, cb, inlineScripts, queueScripts, lastScripts, getScript }) =>
  /**
   * @param {any} i
   * @param {HTMLScriptElement} [origScript]
   */
  (i, origScript) => {
    if (inlineScripts[i] && inlineScripts[i].length) {
      inlineScripts[i].forEach((/**@type string*/ script) => {
        try {
          lastScript = script;
          oWin.eval("(" + FUNCTION + "(){" + script + "}.call(window))");
        } catch (e) {
          if (FUNCTION !== typeof errCb) {
            throw e;
          } else {
            errCb(e, script);
          }
        }
      });
      delete inlineScripts[i];
    }
    const isContinue = callfunc(cb, [
      { key: i, inlineScripts, queueScripts, lastScripts, origScript },
    ]);
    if (false === isContinue) {
      return isContinue;
    }
    if (queueScripts.length) {
      getScript(queueScripts.shift());
    } else if (lastScripts.length) {
      lastScripts.forEach((/** @type HTMLScriptElement*/ script) =>
        getScript(script)
      );
      lastScripts = [];
    }
  };

/**
 * @param {HTMLElement} el
 * @param {window} [oWin]
 * @param {Element} [jsBase]
 * @param {Function} [errCb]
 * @param {Function} [cb]
 * @param {Function} [getScriptCb]
 */
const execScript = (el, oWin, jsBase, errCb, cb, getScriptCb) => {
  oWin = oWin || win();
  jsBase = jsBase || doc(oWin).body;
  const inlineScripts = {};
  const queueScripts = [];
  let lastScripts = [];
  let bStop = false;
  const getScript = (/** @type HTMLScriptElement*/ origScript) => {
    const key = origScript.getAttribute("key");
    const asyncKey = origScript.getAttribute("asyncKey");
    let callback = () => {};
    if (key) {
      callback = () => onLoad(key, origScript);
    }
    if (!bStop) {
      const loadScript = js(jsBase)(callback)(origScript.src, {
        key: key || asyncKey,
      });
      callfunc(getScriptCb, [
        { loadScript, origScript, inlineScripts, queueScripts, lastScripts },
      ]);
      return loadScript;
    }
  };
  const onLoad = handleScriptOnload({
    oWin,
    errCb,
    cb,
    inlineScripts,
    queueScripts,
    lastScripts,
    getScript,
  });
  const thisEl = STRING === typeof el ? create("div")()({ innerHTML: el }) : el;
  const scripts = thisEl?.getElementsByTagName(SCRIPT);
  if (scripts && scripts.length) {
    let key = getSN("script");
    const firstKey = key;
    for (let i = 0, len = scripts.length; i < len; i++) {
      const script = scripts[i];
      const src = script.src;
      if (src) {
        const { async, defer } = /**@type any*/ (script.attributes || {});
        if (async) {
          script.setAttribute("asyncKey", key);
          getScript(script);
        } else if (defer) {
          script.setAttribute("asyncKey", key);
          lastScripts.push(script);
        } else {
          key = getSN("script");
          script.setAttribute("key", key);
          queueScripts.push(script);
        }
      } else {
        if (!inlineScripts[key]) {
          inlineScripts[key] = [];
        }
        inlineScripts[key].push(script.innerHTML);
      }
    }
    onLoad(firstKey);
  }
  return () => (bStop = true);
};

export default execScript;
export { getLastScript };
