import getSafeReg, { cacheReg } from "get-safe-reg";

const getRegString = (name) => "(([#?&])" + getSafeReg(name) + "=)([^&#]*)";

const cache = cacheReg({})(getRegString);

const multiMatchCache = cacheReg({})(getRegString, "g");
const getMultiMatchReg = (name) => multiMatchCache(name);

export default (name) => cache(name);
export { getMultiMatchReg };
