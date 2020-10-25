import { js, create } from "create-el";
import { win, doc } from "win-doc";
import { FUNCTION, STRING, SCRIPT } from "reshow-constant";
import callfunc from "call-func";

let scriptCount = 0;
let lastScript;
const keys = Object.keys;
const getLastScript = () => lastScript;

const handleScriptOnload = ({
  oWin,
  errCb,
  cb,
  inlineScripts,
  queueScripts,
  lastScripts,
  getScript,
}) => (i, origScript) => {
  if (inlineScripts[i] && inlineScripts[i].length) {
    inlineScripts[i].forEach((script) => {
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
    lastScripts.forEach((script) => getScript(script));
    lastScripts = [];
  }
};

const execScript = (el, oWin, jsBase, errCb, cb, getScriptCb) => {
  oWin = oWin || win();
  jsBase = jsBase || doc(oWin).body;
  const inlineScripts = {};
  const queueScripts = [];
  let lastScripts = [];
  let bStop = false;
  const getScript = (origScript) => {
    const { key, asyncKey } = origScript.attributes;
    let callback = null;
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
  const scripts = thisEl.getElementsByTagName(SCRIPT);
  const getNewKey = () => {
    const k = "id-" + scriptCount;
    scriptCount++;
    return k;
  };
  let key = getNewKey();
  let first = key;
  for (let i = 0, len = scripts.length; i < len; i++) {
    const script = scripts[i];
    const src = script.src;
    if (src) {
      const { async, defer } = script.attributes || {};
      if (async) {
        script.attributes.asyncKey = key;
        getScript(script);
      } else if (defer) {
        script.attributes.asyncKey = key;
        lastScripts.push(script);
      } else {
        key = getNewKey();
        script.attributes.key = key;
        queueScripts.push(script);
      }
    } else {
      if (!inlineScripts[key]) {
        inlineScripts[key] = [];
      }
      inlineScripts[key].push(script.innerHTML);
    }
  }
  onLoad(first);
  return () => (bStop = true);
};

export default execScript;
export { getLastScript };
