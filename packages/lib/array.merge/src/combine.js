import get from 'get-object-value';

const keys = Object.keys;

const combine = (arr, objKey) => {
  const nextArr = objKey ? {} : [];
  const thisArr = get(arr);
  const thisKeys = keys(thisArr);
  thisArr[thisKeys[0]].forEach((val, key) => {
    const next = {};
    let thisObjKey = key;
    thisKeys.forEach(k => {
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

const combineSub = (arr, subArr, key) => {
  arr.forEach(a => {
    const thisSub = get(subArr, [a[key]]);
    a[key] = (thisSub) ? combine(thisSub) : null;
  });
  return arr;
};

export default combine;
export {combineSub};
