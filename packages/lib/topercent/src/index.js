'use strict';

const toPercent = (num) => percent(num)+'%';

const percent = (num) => round(num * 100);

const round = (f, precision=2) =>
    Number(f).toFixed(precision);

export {round, percent};

export default toPercent;
