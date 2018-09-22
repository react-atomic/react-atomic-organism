import getSafeReg, {cacheReg} from 'get-safe-reg';

const getRegString = name => getSafeReg(name) + '=([^;]+)';

const cache = cacheReg({})(getRegString);

const getCookieReg = name => cache(name);

const getCookie = (name, cookie) => {
   if (!cookie) {
        cookie = document.cookie;
   }
   const re = getCookieReg(name);
   const value = re.exec(cookie);
   return (value !== null) ? unescape(value[1]) : null;
}

export default getCookie;
export {getRegString as getCookieRegString, getCookieReg};
