import callfunc from "call-func";

const getDateObject = (t) => (null != t ? new Date(t) : new Date());

const getTimestamp = (t) => +getDateObject(t);

/**
 * milliseconds (thousandths of a second)
 */
const expireCallback = (createTime, expireMilliseconds, run, expireCb) => {
  const now = getTimestamp();
  let isExpire = true;
  if (null != createTime && !isNaN(createTime)) {
    if (!expireMilliseconds || now - createTime <= expireMilliseconds) {
      isExpire = false;
    }
  }
  return isExpire ? callfunc(expireCb) : callfunc(run);
};

const sn = {};

const getSN = (name) => {
  sn[name] = sn[name] ?? 0;
  return (name || "") + "_" + sn[name]++;
};

const getRandom = () => getTimestamp() + "" + Math.random();

export default getRandom;

export { expireCallback, getDateObject, getTimestamp, getSN };
