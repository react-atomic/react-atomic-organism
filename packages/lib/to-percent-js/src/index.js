import { UNDEFINED, STRING } from "reshow-constant";

const numTypes = `|number|${STRING}|`;

const toPercent = (num) => percent(num) + "%";

const percent = (num) => round(toNum(num) * 100);

const round = (f, precision = 2) => toNum(f).toFixed(precision);

const toNum = (num) => {
  if (UNDEFINED === typeof num) {
    return 0;
  } else if (-1 === numTypes.indexOf("|" + typeof num + "|") || !num) {
    const maybeNaN = Number(num);
    return isNaN(maybeNaN) ? 0 : maybeNaN;
  } else {
    const maybeString = num && num.trim ? num.trim() : num+"";
    const maybeFloat = parseFloat(maybeString);
    const maybeInt = parseInt(maybeString, 10);
    if (maybeFloat === maybeInt && maybeInt === maybeString) {
      return maybeInt;
    } else {
      if (maybeString === maybeFloat+"") {
        return maybeFloat;
      } else {
        // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number/MAX_SAFE_INTEGER
        let willNum = 0;
        if (-1 !== maybeString.indexOf('.') || (maybeFloat.indexOf && -1 !== maybeFloat.indexOf('.'))) {
          return maybeFloat;
        } else {
          if (!isNaN(maybeString)) {
            willNum = maybeString;
          }
        }
        console.warn("Can not change to number well.", {willNum, maybeString, num});
        return willNum;
      }
    }
  }
};

const toInt = (num) => toNum(round(num, 0));

const numReg = /(\-)?(\d+)(\.)?(\d+)?/g;
const getNum = (s) => {
  if (STRING !== typeof s) {
    return toNum(s);
  }
  const match = s.replace(",", "").match(numReg);
  if (!match) {
    console.warn("Get number fail", s);
    return 0;
  } else {
    return toNum(match[0]);
  }
};

export { round, percent, toNum, getNum, toInt };

export default toPercent;
