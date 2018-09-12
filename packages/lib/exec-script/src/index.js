import {js} from 'create-el';

let scriptCount = 0;
let inlineScripts = [];
let queueScripts = {};

const keys = Object.keys

const handleScriptOnload = win => i => {
  if (i) {
    delete queueScripts[i];
  }
  if (!keys(queueScripts).length) {
    inlineScripts.forEach((script, key) =>
      win.eval(script)
    );
    inlineScripts = [];
  }
};

const execScript = (el, win, jsBase) => {
  if (!win) {
    win = window;
  }
  if (!jsBase) {
    jsBase = document.body;
  }
  const onLoad = handleScriptOnload(win);
  const scripts = el.getElementsByTagName('script');
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
