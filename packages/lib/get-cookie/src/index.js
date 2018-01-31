import getSafeReg from 'get-safe-reg';
const cache = {};

const getCookieRegString = name => getSafeReg(name) + '=([^;]+)';

const getCookieReg = name =>
{
    if (!cache[name]) {
        cache[name] = new RegExp(getCookieRegString(name));
    }
    return cache[name];
}

const getCookie = (name, cookie) => {
   if (!cookie) {
        cookie = document.cookie;
   }
   const re = getCookieReg(name);
   const value = re.exec(cookie);
   return (value != null) ? unescape(value[1]) : null;
}

export default getCookie;
export {getCookieRegString, getCookieReg};
