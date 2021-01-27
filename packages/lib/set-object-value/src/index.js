const isPrototypePolluted = (arrPath) => {
  const joinPath = `|${arrPath.join("|")}|`;
  return ["__proto__", "constructor", "prototype"].some(
    (key) => -1 !== joinPath.indexOf(`|${key}|`)
  );
};

const replaceValue = (obj, arrPath, val, isAppend, unSafe) => {
  if (!unSafe && isPrototypePolluted(arrPath)) {
    throw "Contain un-safe key.";
  }
  const last = arrPath.pop();
  arrPath.forEach((k) => {
    obj[k] = obj[k] ?? Object.create(null);
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

const unsafeSet = (obj, arrPath, val, isAppend) =>
  replaceValue(obj, arrPath, val, isAppend, true);

export default replaceValue;
export { unsafeSet };
