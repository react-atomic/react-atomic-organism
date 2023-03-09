//@ts-check

import callfunc from "call-func";

/**
 * @param {number|string} t
 */
const getDateObject = (t) => (null != t ? new Date(t) : new Date());

/**
 * @param {number|string} [t]
 */
const getTimestamp = (t) => +getDateObject(t);

/**
 * milliseconds (thousandths of a second)
 * @param {number} createTime
 * @param {number} expireMilliseconds
 * @param {function|null} run
 * @param {function|null} expireCb
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

/**
 * @param {string} [name]
 */
const getSN = (name) => {
  sn[name] = sn[name] ?? 0;
  return (name || "") + "_" + sn[name]++;
};

const getRandom = () => getTimestamp() + "" + Math.random();

export default getRandom;

export { expireCallback, getDateObject, getTimestamp, getSN };
