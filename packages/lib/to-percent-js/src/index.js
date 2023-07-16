// @ts-check

import { UNDEFINED, STRING, NUMBER } from "reshow-constant";

const numTypes = `|${NUMBER}|${STRING}|`;

/**
 * @param {any} num
 * @returns {string}
 */
const toPercent = (num) => percent(num) + "%";

/**
 * @param {any} num
 * @returns {string}
 */
const percent = (num) => round(toNum(num) * 100);

/**
 * @param {number} f
 * @param {number} [precision]
 * @returns {string}
 */
const round = (f, precision) => toNum(f).toFixed(precision ?? 2);

const ERROR_INFO = "Get number fail.";

/**
 * @param {any} num
 * @returns {number}
 */
const toNum = (num) => {
  if (UNDEFINED === typeof num) {
    return 0;
  } else if (-1 === numTypes.indexOf("|" + typeof num + "|") || !num) {
    const maybeNaN = Number(num);
    return isNaN(maybeNaN) ? 0 : maybeNaN;
  } else {
    const maybeString = num && num.trim ? num.trim() : num + "";
    const maybeFloat = parseFloat(maybeString);
    const maybeInt = parseInt(maybeString, 10);
    if (
      maybeFloat === maybeInt &&
      (maybeInt + "" === maybeString || 0 === maybeInt)
    ) {
      return maybeInt;
    } else {
      if (maybeString === maybeFloat + "") {
        return maybeFloat;
      } else {
        // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number/MAX_SAFE_INTEGER
        let willNum = 0;
        if (-1 !== maybeString.indexOf(".")) {
          return maybeFloat;
        } else {
          if (!isNaN(maybeString)) {
            willNum = maybeString;
          }
        }
        console.warn(ERROR_INFO, {
          willNum,
          maybeString,
          num,
        });
        return willNum;
      }
    }
  }
};

/**
 * @param {any} num
 * @returns {number}
 */
const toInt = (num) => toNum(round(num, 0));

const numReg = /(\-)?(\d+)(\.)?(\d+)?/g;

/**
 * @param {any} s
 * @returns {number}
 */
const getNum = (s) => {
  if (STRING !== typeof s) {
    return toNum(s);
  }
  const match = s.replace(",", "").match(numReg);
  if (!match) {
    console.warn(ERROR_INFO, s);
    return 0;
  } else {
    return toNum(match[0]);
  }
};

export { round, percent, toNum, getNum, toInt };

export default toPercent;
