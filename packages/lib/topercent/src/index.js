const numTypes = '|number|string|';

const toPercent = num => percent(num) + '%';

const percent = num => round(num * 100);

const round = (f, precision = 2) => toNum(f).toFixed(precision);

const toRoundNum = (f, precision = 2) => toNum(round(f, precision));

const toNum = num =>
  -1 === numTypes.indexOf('|' + typeof num + '|') || !num
    ? Number(num)
    : parseFloat(num) === parseInt(num, 10) 
      ? parseInt(num, 10)
      : parseFloat(num);

const toInt = num => toNum(round(num, 0));

export {round, toRoundNum, percent, toNum, toInt};

export default toPercent;
