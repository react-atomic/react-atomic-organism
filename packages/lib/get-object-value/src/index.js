const isArray = Array.isArray;

const getDefaultValue = v => {
  if ('function' === typeof v) {
    return v();
  }
  return v;
};

const get = (o, path, defaultValue) => {
  if (null === o || 'undefined' === typeof o) {
    return getDefaultValue(defaultValue);
  }
  if (!isArray(path)) {
    return o;
  }
  let current = o;
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

const getWebpack4Default = o =>
  get(o, ['default', 'default'], () => get(o, ['default'], () => o));

const toJS = v => (v && v.toJS ? v.toJS() : v);
const toMap = a => get(toJS(a), null, {});

export default get;
export {getWebpack4Default as getDefault, toJS, toMap};
