import { IS_ARRAY, T_UNDEFINED } from "reshow-constant";

const oneItemArrayToString = (arr) =>
  arr.length > 1 ? arr : arr[0] ?? undefined;

const withArray = (maybeString) =>
  IS_ARRAY(maybeString)
    ? maybeString
    : maybeString !== T_UNDEFINED
    ? [maybeString]
    : [];

export default withArray;

export {oneItemArrayToString};
