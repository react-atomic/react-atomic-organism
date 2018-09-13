'use strict';

const commentReg = /^\s*[;]/;
const kvReg=/^\[([^\]]*)\]$|^([^=]+)(=(.*))?$/i;
const linesReg=/[\r\n]+/g;
const trimReg=/(^\s+)|\s+$/g;
const stripQuoteReg=/\\"/g;
const isArray = Array.isArray;

const trim = s => s.replace(trimReg, '')

const isQuoted = (s) =>
{
  if (s.length<=1) {
        return false;
  }
  return (s.charAt(0) === '"' && s.slice(-1) === '"') ||
    (s.charAt(0) === "'" && s.slice(-1) === "'")
}

const stripQuote = s => s.replace(stripQuoteReg, '"').substring(1, s.length - 1)

const isMultiLine = (s) =>
{
    let n =trim(s);
    if (isQuoted(n)) {
        return false;
    }
    if (n.charAt(0) === '"') {
        return true;
    } else {
        return false;
    }
}

const parse = (s) =>
{
    const lines = s.split(linesReg);
    let value = '';
    let key = '';
    let p = {};
    lines.forEach((line)=>{
        let isEnd = false;
        if (!line || commentReg.test(line)) {
            return;
        }
        if (!key) {
            const match = line.match(kvReg);
            key = match[2];
            value = match[3] ? (match[4] || '') : '';
            if (key.length > 2 && key.slice(-2) === '[]') {
                  key = key.substring(0, key.length - 2)
                  if (!p[key]) {
                    p[key] = []
                  } else if (!Array.isArray(p[key])) {
                    p[key] = [p[key]]
                  }
            }
            if (!isMultiLine(value)) {
                isEnd = true;
            }
        } else {
            if (trim(line).slice(-1) === '"') {
                isEnd = true;
            }
            value+=line;
        }
        if (isEnd) {
            if (isQuoted(value)) {
                value = stripQuote(value);
            }
            switch (value) {
              case 'true':
              case 'false':
              case 'null': value = JSON.parse(value)
            }
            if (isArray(p[key])) {
              p[key].push(value);
            } else {
              p[key] = value;
            } 
            key = '';
            value = '';
        }
    });
    return p;
};

export default parse;
