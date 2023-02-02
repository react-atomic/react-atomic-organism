// @ts-check
import { win } from "win-doc";

/**
 * @param {string} s
 * @returns void
 */
const clipboardCopy = (s) => {
  win().navigator.clipboard.writeText(s);
};

export default clipboardCopy;
