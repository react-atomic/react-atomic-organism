import getSafeReg, { cacheReg } from "get-safe-reg";
import { doc } from "win-doc";

let isCookieSupport = true;

const getRegString = (name) => "(?:^|;)\\s?" + getSafeReg(name) + "=([^;]+)";

const cache = cacheReg({})(getRegString);

const getCookieReg = (name) => cache(name);

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

const notSupport = (e) => {
  console.warn("cookie not support", { e });
  isCookieSupport = false;
};

const getCookie = (name, cookie) => {
  cookie = docCookie(cookie);
  const value = getCookieReg(name).exec(cookie);
  return value !== null ? decodeURIComponent(value[1]) : null;
};

const getCookieSetStr = (cname, cvalue, exdays, domain) => {
  exdays = exdays || 0;
  domain = domain || "";
  let expires = "";
  if (exdays) {
    const d = new Date();
    d.setTime(d.getTime() + exdays * 24 * 60 * 60 * 1000);
    expires = "expires=" + d.toUTCString() + ";";
  }
  if (domain) {
    domain = "domain=" + domain + ";" || "";
  }
  const cStr = cname + "=" + cvalue + ";" + expires + domain + "path=/";
  return cStr;
};

const setCookie = (cname, cvalue, exdays, domain) => {
  if (isCookieSupport) {
    try {
      doc().cookie = getCookieSetStr(cname, cvalue, exdays, domain);
    } catch (e) {
      notSupport(e);
    }
  }
};

export default getCookie;
export {
  getRegString as getCookieRegString,
  getCookieReg,
  setCookie,
  getCookieSetStr,
};
