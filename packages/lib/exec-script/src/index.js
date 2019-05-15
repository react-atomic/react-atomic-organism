import {js, create} from 'create-el';
import {win, doc} from 'win-doc';
import {FUNCTION, STRING, SCRIPT} from 'reshow-constant';
import callfunc from 'call-func';

let scriptCount = 0;
let inlineScripts = {};
let queueScripts = [];
let getScript;
let lastScript;
let lastScripts = [];

const keys = Object.keys;

const getLastScript = () => lastScript;

const handleScriptOnload = (win, errCb, cb) => (i, origScript) => {
  if (inlineScripts[i] && inlineScripts[i].length) {
    inlineScripts[i].forEach(script => {
      try {
        lastScript = script;
        win.eval('(' + FUNCTION + '(){' + script + '}())');
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
    {key: i, inlineScripts, queueScripts, lastScripts, origScript},
  ]);
  if (false === isContinue) {
    return isContinue;
  }
  if (queueScripts.length) {
    getScript(queueScripts.shift());
  } else if (lastScripts.length) {
    lastScripts.forEach(script => getScript(script));
  }
};

const execScript = (el, oWin, jsBase, errCb, cb, getScriptCb) => {
  oWin = oWin || win();
  jsBase = jsBase || doc(oWin).body;
  const onLoad = handleScriptOnload(oWin, errCb, cb);
  getScript = origScript => {
    const key = origScript.attributes.key;
    let callback = null;
    if (key) {
      callback = () => onLoad(key, origScript);
    }
    const loadScript = js(jsBase)(callback)(origScript.src, {key});
    callfunc(getScriptCb, [{loadScript, origScript, inlineScripts, queueScripts, lastScripts}]);
    return loadScript;
  };
  const thisEl = STRING === typeof el ? create('div')()({innerHTML: el}) : el;
  const scripts = thisEl.getElementsByTagName(SCRIPT);
  const getNewKey = () => {
    const k = 'id-' + scriptCount;
    scriptCount++;
    return k;
  };
  let key = getNewKey();
  let first = key;
  for (let i = 0, len = scripts.length; i < len; i++) {
    const script = scripts[i];
    const src = script.src;
    if (src) {
      const {async, defer} = script.attributes || {};
      if (async) {
        script.attributes.asyncKey = key;
        getScript(script);
      } else if (defer) {
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
};

export default execScript;
export {getLastScript};
