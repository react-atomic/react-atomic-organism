import { FUNCTION } from "reshow-constant";
const getDefaultValue = (v, cur) => (FUNCTION === typeof v ? v(cur) : v ?? cur);
export default getDefaultValue;
