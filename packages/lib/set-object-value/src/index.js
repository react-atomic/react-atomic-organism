const isUnSafeKey = (key) =>
  key === "__proto__" || key === "constructor" || key === "prototype";

const replaceValue = (obj, arrKey, val, isAppend, unSafe) => {
  if (!unSafe && arrKey.some(isUnSafeKey)) {
    throw "Contain un-safe key.";
  }
  const last = arrKey.pop();
  arrKey.forEach((k) => {
    obj[k] = obj[k] || {};
    obj = obj[k];
  });
  if (isAppend && (!obj[last] || !obj[last].push)) {
    if (!obj[last]) {
      obj[last] = [val];
    } else {
      obj[last] = [obj[last], val];
    }
  } else if (isAppend && obj[last].push) {
    obj[last].push(val);
  } else {
    obj[last] = val;
  }
};

const unsafeSet = (obj, arrKey, val, isAppend) =>
  replaceValue(obj, arrKey, val, isAppend, true);

export default replaceValue;
export { unsafeSet };
