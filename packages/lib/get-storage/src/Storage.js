import {toJS} from 'get-object-value';
import {OBJECT} from 'reshow-constant';

const keys = Object.keys;
const toInt = d => parseInt(d, 10);

class Storage {
  constructor(_storage) {
    this._storage = _storage;
  }

  set(k, v) {
    const _v = JSON.stringify(toJS(v));
    const vLen = _v.length;
    const s = vLen + ',' + _v;
    this._storage(k)(s);
    return new Storage(this._storage);
  }

  merge(arr) {
    if (!arr || OBJECT !== typeof arr) {
      return this;
    }
    const pKeys = keys(arr);
    if (!pKeys || !pKeys.length) {
      return this;
    }
    pKeys.forEach(key => this.set(key, arr[key]));
    return new Storage(this._storage);
  }

  get(k) {
    const s = this._storage(k)();
    if (!s) {
      return;
    }
    const iStar = s.indexOf(',');
    const vLen = toInt(s.substring(0, iStar));
    const value = s.substr(iStar + 1);
    return vLen === value.length ? JSON.parse(value) : null;
  }
}

export default Storage;
