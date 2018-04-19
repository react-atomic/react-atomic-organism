const esc = /[|\\{}()[\]^$+*?.]/g;
const getSafeReg = (name) => name.replace(esc, '\\$&');
const cacheReg = cache => regString => name => {
    if (!cache[name]) {
        cache[name] = new RegExp(regString(name));
    }
    return cache[name];
}
export default getSafeReg;
export {cacheReg};
