const esc = /[|\\{}()[\]^$+*?.]/g;

const text = (txt) => (txt ? txt + "" : "");

const getSafeReg = (regString) => text(regString).replace(esc, "\\$&");

const cacheReg = (cache) => (getRegCallback, flags) => (regString) => {
  if (!cache[regString]) {
    const cookRegString = getRegCallback
      ? getRegCallback(regString)
      : regString;
    cache[regString] = new RegExp(cookRegString, flags);
  }
  return cache[regString];
};

const safeMatch = (testText, reg) => text(testText).match(reg);

export default getSafeReg;
export { cacheReg, safeMatch };
