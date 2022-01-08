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
  let linkObj = obj;
  arrPath.forEach((k) => {
    linkObj[k] = linkObj[k] ?? Object.create(null);
    linkObj = linkObj[k];
  });
  if (isAppend && (!linkObj[last] || !linkObj[last].push)) {
    if (!linkObj[last]) {
      linkObj[last] = [val];
    } else {
      linkObj[last] = [linkObj[last], val];
    }
  } else if (isAppend && linkObj[last].push) {
    linkObj[last].push(val);
  } else {
    linkObj[last] = val;
  }
};

const unsafeSet = (obj, arrPath, val, isAppend) =>
  replaceValue(obj, arrPath, val, isAppend, true);

export default replaceValue;
export { unsafeSet };
