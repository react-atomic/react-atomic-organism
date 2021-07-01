import shouldBeString from "./shouldBeString";

const toArray = (maybeString) =>
  shouldBeString(maybeString) ? [maybeString] : maybeString;

export default toArray;
