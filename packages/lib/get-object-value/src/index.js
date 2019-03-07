import {DEFAULT, FUNCTION, UNDEFINED} from 'reshow-constant';

const isArray = Array.isArray;

const getWebpack4Default = o =>
  get(o, [DEFAULT, DEFAULT], () => get(o, [DEFAULT], () => o));

const toJS = v => (v && v.toJS ? v.toJS() : v);

const toMap = a => get(toJS(a), null, {});

const initMap = o => (k, v) => o[k] || (o[k] = getDefaultValue(v));

const getDefaultValue = v => (FUNCTION === typeof v ? v() : v);

const get = (o, path, defaultValue) => {
  if (null === o || UNDEFINED === typeof o) {
    return getDefaultValue(defaultValue);
  }
  let current = toJS(o);
  if (!isArray(path)) {
    return current;
  }
  path.every(a => {
    if (null !== current[a] && UNDEFINED !== typeof current[a]) {
      current = current[a];
      return true;
    } else {
      current = getDefaultValue(defaultValue);
      return false;
    }
  });
  return current;
};

export default get;
export {getWebpack4Default as getDefault, toJS, toMap, initMap};
