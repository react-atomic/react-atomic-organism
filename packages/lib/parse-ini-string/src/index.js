const commentReg = /^\s*[;]/;
const kvReg = /^\[([^\]]*)\]$|^([^=]+)(=(.*))?$/i;
const linesReg = /[\r\n]+/g;
const stripQuoteReg = /\\"/g;
const isArray = Array.isArray;

const isQuoted = s => {
  if (s.length <= 1) {
    return false;
  }
  const bAndE = s.charAt(0) + '' + s.slice(-1);
  return bAndE === '""' || bAndE === "''";
};

const stripQuote = s =>
  s.replace(stripQuoteReg, '"').substring(1, s.length - 1);

const isMultiLine = s => {
  const n = s.trim();
  if (isQuoted(n)) {
    return false;
  }
  if (n.charAt(0) === '"') {
    return true;
  } else {
    return false;
  }
};

const parse = s => {
  const lines = s.split(linesReg);
  let value = '';
  let key = '';
  const p = {};
  lines.forEach(line => {
    let isEnd = false;
    if (!line || commentReg.test(line)) {
      return;
    }
    if (!key) {
      const match = line.match(kvReg);
      if (!match) {
        console.error('Ini Parse Fail: ' + line);
        return;
      }
      key = match[2];
      value = match[3] ? match[4] || '' : '';
      if (key.length > 2 && key.slice(-2) === '[]') {
        key = key.substring(0, key.length - 2);
        if (!p[key]) {
          p[key] = [];
        } else if (!isArray(p[key])) {
          p[key] = [p[key]];
        }
      }
      if (!isMultiLine(value)) {
        isEnd = true;
      }
    } else {
      if (line.trim().slice(-1) === '"') {
        isEnd = true;
      }
      value += line;
    }
    if (isEnd) {
      if (isQuoted(value)) {
        value = stripQuote(value);
      } else {
        switch (value.toLowerCase()) {
          case 'true':
          case 'false':
          case 'null':
            value = JSON.parse(value.toLowerCase());
            break;
        }
      }
      key = key.trim();
      if (key) {
        if (isArray(p[key])) {
          p[key].push(value);
        } else {
          p[key] = value;
        }
      }
      key = '';
      value = '';
    }
  });
  return p;
};

export default parse;
