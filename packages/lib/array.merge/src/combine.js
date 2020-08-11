import get from "get-object-value";

const keys = Object.keys;

const combine = (arr, objKey) => {
  const nextArr = objKey ? {} : [];
  const thisArr = get(arr, null, {});
  const thisKeys = keys(thisArr);
  if (!thisArr[thisKeys[0]] || !thisArr[thisKeys[0]].forEach) {
    console.warn("Not array.", { thisArr, thisKeys }, thisKeys[0]);
    return;
  }
  thisArr[thisKeys[0]].forEach((val, key) => {
    const next = {};
    let thisObjKey = key;
    thisKeys.forEach((k) => {
      next[k] = get(thisArr, [k, key]);
      if (objKey && objKey === k) {
        thisObjKey = next[k];
      }
    });
    if (!objKey) {
      nextArr.push(next);
    } else {
      nextArr[thisObjKey] = next;
    }
  });
  return nextArr;
};

const getAllCombine = (arr) => {
  const arrKeys = keys(arr);
  const results = {};
  arrKeys.forEach(key => {
    results[key] = combine(arr, key);
  });
  return results;
};

const combineSub = (arr, subArr, key, subObjKey) => {
  arr.forEach((a) => {
    const thisSub = get(subArr, [a[key]]);
    a[key] = thisSub ? combine(thisSub, subObjKey) : null;
  });
  return arr;
};

export default combine;
export { combineSub, getAllCombine };
