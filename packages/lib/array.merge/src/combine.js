import get from 'get-object-value';

const keys = Object.keys;

const combine = arr => {
  const nextArr = [];
  const thisKeys = keys(arr);
  arr[thisKeys[0]].forEach((val, key) => {
    const next = {};
    thisKeys.forEach(k => {
      next[k] = get(arr, [k, key]);
    });
    nextArr.push(next);
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
