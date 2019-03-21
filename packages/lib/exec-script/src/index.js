import {js, create} from 'create-el';
import {win, doc} from 'win-doc';
import {FUNCTION, STRING, SCRIPT} from 'reshow-constant';

let scriptCount = 0;
let inlineScripts = [];
let queueScripts = {};
let lastScript;

const keys = Object.keys;

const getLastScript = () => lastScript;

const handleScriptOnload = (win, errCb) => i => {
  if (i) {
    delete queueScripts[i];
  }
  if (!keys(queueScripts).length) {
    inlineScripts.forEach((script, key) => {
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
    inlineScripts = [];
  }
};

const execScript = (el, oWin, jsBase, errCb) => {
  oWin = oWin || win();
  jsBase = jsBase || doc().body;
  const thisEl = STRING === typeof el ? create('div')()({innerHTML: el}) : el;
  const onLoad = handleScriptOnload(oWin, errCb);
  const scripts = thisEl.getElementsByTagName(SCRIPT);
  for (let i = 0, len = scripts.length; i < len; i++) {
    const script = scripts[i];
    const src = script.src;
    if (src) {
      const attrs = script.attributes;
      attrs.key = 'id-' + scriptCount;
      const dScript = js(jsBase)(() => onLoad(key))(src, {key});
      queueScripts[key] = dScript;
      scriptCount++;
    } else {
      inlineScripts.push(script.innerHTML);
    }
  }
  onLoad();
};

export default execScript;
export {getLastScript};
