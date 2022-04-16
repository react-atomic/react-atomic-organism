const toJS = (v) => (v && v.toJS ? v.toJS() : v);
export default toJS;
