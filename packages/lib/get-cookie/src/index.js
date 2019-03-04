import getSafeReg, {cacheReg} from 'get-safe-reg';
import {doc} from 'win-doc';

const getRegString = name => getSafeReg(name) + '=([^;]+)';

const cache = cacheReg({})(getRegString);

const getCookieReg = name => cache(name);

const docCookie = cookie => cookie || doc().cookie;

const getCookie = (name, cookie) => {
  cookie = docCookie(cookie);
  const value = getCookieReg(name).exec(cookie);
  return value !== null ? decodeURIComponent(value[1]) : null;
};

const setCookie = (cname, cvalue, exdays) => {
  const d = new Date();
  d.setTime(d.getTime() + exdays * 24 * 60 * 60 * 1000);
  const expires = 'expires=' + d.toUTCString();
  doc().cookie = cname + '=' + cvalue + ';' + expires + ';path=/';
};

export default getCookie;
export {getRegString as getCookieRegString, getCookieReg, setCookie};
