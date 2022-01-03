import { IS_ARRAY, T_UNDEFINED } from "reshow-constant";

const withArray = (maybeString) =>
  IS_ARRAY(maybeString)
    ? maybeString
    : maybeString !== T_UNDEFINED
    ? [maybeString]
    : [];

export default withArray;
