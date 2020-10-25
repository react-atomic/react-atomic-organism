import getSafeReg, { cacheReg } from "get-safe-reg";

const getRegString = (name) => "(?:^|\\s+)" + getSafeReg(name) + "(?:\\s+|$)";

const cache = cacheReg({})(getRegString);

export default (name) => cache(name);
