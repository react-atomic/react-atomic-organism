import callfunc from "call-func";
import { doc } from "win-doc";
import { KEYS } from "reshow-constant";

const inject = (base, isPrepend) => (dNode) => {
  base = callfunc(base);
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

const create = (tag) => (callback) => (attrs) => {
  const d = doc();
  if (d.createElement) {
    const dNode = d.createElement(tag);
    if (attrs) {
      KEYS(attrs).forEach((key) => (dNode[key] = attrs[key]));
    }
    if (callback) {
      let _isRun;
      dNode.onreadystatechange = dNode.onload = () => {
        const readyState = dNode.readyState;
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
    }
    return dNode;
  }
};

const remove = (dNode) => {
  if (dNode) {
    try {
      dNode.parentNode.removeChild(dNode);
      dNode = null;
    } catch (e) {}
  }
};

const js = (base, isPrepend) => (callback) => (url, attrs) => {
  const dNode = create("script")(callback)(attrs);
  if (false !== base) {
    inject(base, isPrepend)(dNode);
  }
  dNode.src = url;
  return dNode;
};

const css = (base, isPrepend) => (callback) => (url, attrs) => {
  const dNode = create("link")(callback)({
    rel: "stylesheet",
    type: "text/css",
    ...attrs,
  });
  if (false !== base) {
    inject(base, isPrepend)(dNode);
  }
  dNode.href = url;
  return dNode;
};

export { js, css, inject, create, remove };
