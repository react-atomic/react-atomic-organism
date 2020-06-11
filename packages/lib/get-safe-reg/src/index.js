const esc = /[|\\{}()[\]^$+*?.]/g;
const getSafeReg = (name) => name.replace(esc, '\\$&');
const cacheReg = cache => (regString, flags) => name => {
    if (!cache[name]) {
        cache[name] = new RegExp(regString(name), flags);
    }
    return cache[name];
}
export default getSafeReg;
export {cacheReg};
