import { toJS } from "get-object-value";
import { OBJECT, KEYS } from "reshow-constant";

const toInt = (d) => parseInt(d, 10);

const parseField = (s) => {
  const iStar = s.indexOf(",");
  const len = toInt(s.substring(0, iStar));
  const val = s.substring(iStar + 1);
  return [len, val];
};

const encode = (s) => {
  const _v = JSON.stringify(toJS(s));
  const vLen = _v.length;
  const result = vLen + "," + _v;
  return result;
};

const decode = (s) => {
  const [vLen, value] = parseField(s);
  return vLen === value.length ? JSON.parse(value) : null;
};

class Storage {
  constructor(_storage) {
    this._storage = _storage;
  }

  set(k, v) {
    const s = encode(v);
    this._storage(k)(s);
    return new Storage(this._storage);
  }

  merge(arr) {
    if (!arr || OBJECT !== typeof arr) {
      return this;
    }
    const pKeys = KEYS(arr);
    if (!pKeys || !pKeys.length) {
      return this;
    }
    pKeys.forEach((key) => this.set(key, arr[key]));
    return new Storage(this._storage);
  }

  get(k) {
    const s = this._storage(k)();
    if (!s) {
      return;
    }
    return decode(s);
  }
}

export default Storage;
export { parseField, encode, decode };
