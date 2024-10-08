//@ts-check

import callfunc from "call-func";

/**
 * @param {number|string} [t]
 */
const getDateObject = (t) => (null != t ? new Date(t) : new Date());

/**
 * @param {number|string} [t]
 */
const getTimestamp = (t) => +getDateObject(/** @type {number|string}*/ (t));

/**
 * milliseconds (thousandths of a second)
 * @param {number?} createTime
 * @param {number?} expireMilliseconds
 * @param {function|null} run
 * @param {function|null} expireCb
 */
const expireCallback = (createTime, expireMilliseconds, run, expireCb) => {
  const now = getTimestamp();
  let isExpire = true;
  if (null == createTime || isNaN(createTime)) {
    createTime = now -1;
  }
  if (null == expireMilliseconds || isNaN(expireMilliseconds)) {
    expireMilliseconds = -1;
  }
  if (now - createTime <= expireMilliseconds) {
    isExpire = false;
  }
  return isExpire ? callfunc(expireCb) : callfunc(run);
};

const sn = {};

/**
 * @param {string} [name]
 * @param {string} [separator]
 */
const getSN = (name, separator = "_") => {
  sn[name] = sn[name] ?? 0;
  return (name || "") + separator + sn[name]++;
};

const getRandom = () => getTimestamp() + "" + Math.random();

export default getRandom;

export { expireCallback, getDateObject, getTimestamp, getSN };
