//@ts-check

import getSafeReg, { cacheReg } from "get-safe-reg";
import { doc } from "win-doc";
import { getCookieSetStr } from "./getCookieSetStr";

let isCookieSupport = true;

/**
 * @param {string} name
 * @returns {string}
 */
const getRegString = (name) => "(?:^|;)\\s?" + getSafeReg(name) + "=([^;]+)";

const cache = cacheReg({})(getRegString);

/**
 * @param {string} name
 * @returns {RegExp}
 */
const getCookieReg = (name) => cache(name);

/**
 * @param {string} [cookie]
 * @returns {string}
 */
const docCookie = (cookie) => {
  if (cookie) {
    return cookie;
  } else {
    if (isCookieSupport) {
      try {
        return doc().cookie;
      } catch (e) {
        notSupport(e);
        return "";
      }
    } else {
      return "";
    }
  }
};

/**
 * @param {Error} e
 */
const notSupport = (e) => {
  console.warn("cookie not support", { e });
  isCookieSupport = false;
};

/**
 * @param {string} name
 * @param {string} [cookie]
 * @returns {string|null}
 */
const getCookie = (name, cookie) => {
  cookie = docCookie(cookie);
  const value = getCookieReg(name).exec(cookie);
  return value !== null ? decodeURIComponent(value[1]) : null;
};

/**
 * @param {string} cname
 * @param {string} cvalue
 * @param {number} [exdays]
 * @param {string} [domain]
 */
const setCookie = (cname, cvalue, exdays, domain) => {
  if (isCookieSupport) {
    try {
      const dayToMillisecond = exdays ? exdays * 24 * 60 * 60 * 1000 : 0;
      doc().cookie = getCookieSetStr(cname, cvalue, dayToMillisecond, domain);
    } catch (e) {
      notSupport(e);
    }
  }
};

/**
 * @param {string} cname
 * @param {string} [domain]
 */
export const deleteCookie = (cname, domain) => {
  if (isCookieSupport) {
    try {
      doc().cookie = getCookieSetStr(cname, undefined, -86400, domain);
    } catch (e) {
      notSupport(e);
    }
  }
};

export default getCookie;
export { getRegString as getCookieRegString, getCookieReg, setCookie };
