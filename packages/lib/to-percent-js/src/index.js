const numTypes = '|number|string|';

const toPercent = num => percent(num) + '%';

const percent = num => round(toNum(num) * 100);

const round = (f, precision = 2) => toNum(f).toFixed(precision);

const toNum = num => {
  if ('undefined' === typeof num) {
    return 0;
  } else if (-1 === numTypes.indexOf('|' + typeof num + '|') || !num) {
    return Number(num);
  } else {
    const maybeFloat = parseFloat(num);
    const maybeInt = parseInt(num, 10);
    if (maybeFloat === maybeInt) {
      return maybeInt;
    } else {
      return isNaN(maybeFloat) ? 0 : maybeFloat;
    }
  }
};

const toInt = num => toNum(round(num, 0));

const numReg = /(\-)?(\d+)(\.)?(\d+)?/g;
const getNum = s => {
  const match = s.replace(',', '').match(numReg);
  if (!match) {
    console.warn('Get number fail', s);
    return 0;
  } else {
    return toNum(match[0]);
  }
};

export {round, percent, toNum, getNum, toInt};

export default toPercent;
