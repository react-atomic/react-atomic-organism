import { KEYS } from "reshow-constant";
import { initMap } from "get-object-value";
import callfunc from "./callfunc";

const count = {
  el: 1,
  opt: 1,
};
const allWrapMap = {};
const wrapKey = "data-event-wrap-id";

const initEventWrap = (el) => {
  let wrapId = el.getAttribute ? el.getAttribute(wrapKey) : el[wrapKey];
  if (!wrapId) {
    wrapId = count.el;
    count.el++;
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
    const thisOptId = count.opt;
    const thisTypeMap = initMap(this.typeMap)(type, []);
    const optionMap = this.optionMap;
    count.opt++;
    optionMap[thisOptId] = [type, func, ...options];
    thisTypeMap.push(thisOptId);
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
      const thisTypeMap = initMap(this.typeMap)(type, []);
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

export default register;
export { cleanAllRegister };