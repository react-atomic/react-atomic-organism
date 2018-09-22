import getSafeReg, {cacheReg} from 'get-safe-reg';

const getRegString = name => getSafeReg(name) + '=([^;]+)';

const cache = cacheReg({})(getRegString);

const getCookieReg = name => cache(name);

const getCookie = (name, cookie) => {
  if (!cookie) {
    cookie = document.cookie;
  }
  const value = getCookieReg(name).exec(cookie);
  return value !== null ? decodeURIComponent(value[1]) : null;
};

export default getCookie;
export {getRegString as getCookieRegString, getCookieReg};
