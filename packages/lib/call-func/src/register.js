import { KEYS } from "reshow-constant";
import callfunc from "./callfunc";

const count = {
  el: 0,
  opt: 0,
};
const allWrapMap = {};
const wrapKey = "data-event-wrap-id";

const initEventWrap = (el) => {
  let wrapId = el.getAttribute ? el.getAttribute(wrapKey) : el[wrapKey];
  if (!wrapId) {
    wrapId = ++count.el;
    if (el.setAttribute) {
      el.setAttribute(wrapKey, wrapId);
    } else {
      el[wrapKey] = wrapId;
    }
  }
  let obj = allWrapMap[wrapId];
  if (!obj) {
    obj = new EventWrap(wrapId, el);
    allWrapMap[wrapId] = obj;
  }
  return obj;
};

class EventWrap {
  optionMap = {};
  typeMap = {};
  constructor(id, el) {
    this.id = id;
    this.el = el;
  }

  addEventListener = (type, func, ...options) => {
    const thisOptId = ++count.opt;
    const optionMap = this.optionMap;
    optionMap[thisOptId] = [type, func, ...options];
    if (!this.typeMap[type]) {
      this.typeMap[type] = [];
    }
    this.typeMap[type].push(thisOptId);
    callfunc(this.el.addEventListener, optionMap[thisOptId], this.el);
    return thisOptId;
  };

  removeEventListener = (typeOrId, func, ...options) => {
    const optionMap = this.optionMap;
    let thisOptions;
    let id;
    if (!isNaN(typeOrId) && optionMap[typeOrId]) {
      id = typeOrId;
      thisOptions = optionMap[id];
    } else {
      thisOptions = [typeOrId, func, ...options];
    }
    callfunc(this.el.removeEventListener, thisOptions, this.el);
    if (id) {
      const type = thisOptions[0];
      const thisTypeMap = this.typeMap[type] || [];
      this.typeMap[type] = thisTypeMap.filter((item) => item != id);
      delete optionMap[id];
    }
  };

  cleanAll(type) {
    const optionMap = this.optionMap;
    if (null != type) {
      if (this.typeMap[type]) {
        this.typeMap[type].forEach((key) => {
          this.removeEventListener(key);
        });
      }
    } else {
      KEYS(optionMap).forEach((key) => {
        this.removeEventListener(key);
      });
    }
  }
}

const register = (el) => initEventWrap(el);

const cleanAllRegister = (type) => {
  KEYS(allWrapMap).forEach((key) => {
    allWrapMap[key].cleanAll(type);
  });
};

export { register, cleanAllRegister };
