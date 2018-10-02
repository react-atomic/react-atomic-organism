import {js, create} from 'create-el';

let scriptCount = 0;
let inlineScripts = [];
let queueScripts = {};

const keys = Object.keys;

const handleScriptOnload = (win, errCb) => i => {
  if (i) {
    delete queueScripts[i];
  }
  if ('function' !== typeof errCb) {
    errCb = console.error; 
  }

  if (!keys(queueScripts).length) {
    inlineScripts.forEach((script, key) => {
      try {
        win.eval('(function(){ ' + script + ' }())');
      } catch (e) {
        errCb(e, script);
      }
    });
    inlineScripts = [];
  }
};

const execScript = (el, win, jsBase, errCb) => {
  if (!win) {
    win = window;
  }
  if (!jsBase) {
    jsBase = document.body;
  }
  const thisEl =
    'string' === typeof el ? create('div')()({innerHTML: el}) : el;
  const onLoad = handleScriptOnload(win, errCb);
  const scripts = thisEl.getElementsByTagName('script');
  for (let i = 0, len = scripts.length; i < len; i++) {
    const script = scripts[i];
    if (script.src) {
      const key = 'id-' + scriptCount;
      const dScript = js(jsBase)(() => onLoad(key))(script.src, {key});
      queueScripts[key] = dScript;
      scriptCount++;
    } else {
      inlineScripts.push(script.innerHTML);
    }
  }
  onLoad();
};

export default execScript;
