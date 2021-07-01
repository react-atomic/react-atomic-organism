import { STRING } from "reshow-constant";

const shouldBeString = (s) => null == s || !isNaN(s) || STRING === typeof s;

export default shouldBeString;
