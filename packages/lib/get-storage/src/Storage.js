//@ts-check
import { toJS, forEachMap } from "get-object-value";

const toInt = (/**@type string*/ d) => parseInt(d, 10);

/**
 * @param {string} s
 * @returns {[number, string]}
 */
const parseField = (s) => {
  const iStar = s.indexOf(",");
  const len = toInt(s.substring(0, iStar));
  const val = s.substring(iStar + 1);
  return [len, val];
};

/**
 * @param {string} s
 */
const encode = (s) => {
  const _v = JSON.stringify(toJS(s));
  const vLen = _v.length;
  const result = vLen + "," + _v;
  return result;
};

/**
 * @param {string} s
 */
const decode = (s) => {
  const [vLen, value] = parseField(s);
  return vLen === value.length ? JSON.parse(value) : null;
};

class Storage {
  /**
   * @param {function} _storage
   * @param {boolean=}  _disableEncode
   */
  constructor(_storage, _disableEncode) {
    this._storage = _storage;
    this._de = _disableEncode;
  }

  /**
   * @param {string} k
   * @param {any} v
   */
  set(k, v) {
    const origV = this.get(k);
    if (v !== origV) {
      const s = this._de ? v : encode(v);
      this._storage(k)(s);
      return new Storage(this._storage, this._de);
    } else {
      return this;
    }
  }

  /**
   * @param {object} arr
   */
  merge(arr) {
    let nextObj;
    forEachMap(
      arr,
      /**
       * @param {any} v
       * @param {string} k
       */
      (v, k) => {
        nextObj = this.set(k, v);
      }
    );
    return nextObj;
  }

  /**
   * @param {string} k
   */
  get(k) {
    const s = this._storage(k)();
    if (!s) {
      return;
    }
    return this._de ? s : decode(s);
  }
}

export default Storage;
export { parseField, encode, decode };
