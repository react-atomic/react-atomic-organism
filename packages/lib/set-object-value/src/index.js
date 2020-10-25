const replaceValue = (obj, arrKey, val, isAppend) => {
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

export default replaceValue;
