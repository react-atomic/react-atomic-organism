const esc = /[|\\{}()[\]^$+*?.]/g;
const getSafeReg = (name) => name.replace(esc, '\\$&');
export default getSafeReg;
