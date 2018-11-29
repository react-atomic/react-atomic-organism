const isArray = Array.isArray;

const getWebpack4Default = o =>
  get(o, ['default', 'default'], () => get(o, ['default'], () => o));

const toJS = v => (v && v.toJS ? v.toJS() : v);

const toMap = a => get(toJS(a), null, {});

const initMap = o => (k, v) => o[k] || (o[k] = getDefaultValue(v));

const getDefaultValue = v => ('function' === typeof v ? v() : v);

const get = (o, path, defaultValue) => {
  if (null === o || 'undefined' === typeof o) {
    return getDefaultValue(defaultValue);
  }
  if (!isArray(path)) {
    return toJS(o);
  }
  let current = toJS(o);
  path.every(a => {
    if (null !== current[a] && 'undefined' !== typeof current[a]) {
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
