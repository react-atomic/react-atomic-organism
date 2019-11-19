import getSafeReg, {cacheReg} from 'get-safe-reg';
import {doc} from 'win-doc';

const getRegString = name => '(?:^|;)\\s?' + getSafeReg(name) + '=([^;]+)';

const cache = cacheReg({})(getRegString);

const getCookieReg = name => cache(name);

const docCookie = cookie => cookie || doc().cookie;

const getCookie = (name, cookie) => {
  cookie = docCookie(cookie);
  const value = getCookieReg(name).exec(cookie);
  return value !== null ? decodeURIComponent(value[1]) : null;
};

const getCookieSetStr = (cname, cvalue, exdays, domain) => {
  exdays = exdays || 0;
  domain = domain || '';
  let expires = '';
  if (exdays) {
    const d = new Date();
    d.setTime(d.getTime() + exdays * 24 * 60 * 60 * 1000);
    expires = 'expires=' + d.toUTCString() + ';';
  }
  if (domain) {
    domain = 'domain=' + domain + ';' || '';
  }
  const cStr = cname + '=' + cvalue + ';' + expires + domain + 'path=/';
  return cStr;
};

const setCookie = (cname, cvalue, exdays, domain) => {
  doc().cookie = getCookieSetStr(cname, cvalue, exdays, domain);
};

export default getCookie;
export {
  getRegString as getCookieRegString,
  getCookieReg,
  setCookie,
  getCookieSetStr,
};
