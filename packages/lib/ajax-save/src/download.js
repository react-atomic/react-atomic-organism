//@ts-check

import { inject, create, remove } from "create-el";
import getRandomId from "get-random-id";
import { win } from "win-doc";

/**
 * @param {any} o
 * @returns {boolean}
 */
const isBlob = (o) =>
  o instanceof Blob || Object.prototype.toString.call(o) === "[object Blob]";

/**
 * @param {string} text
 * @param {string} fileName
 * @param {any} option
 * @param {boolean} isKeep
 */
const execDownload = (text, fileName, option, isKeep) => {
  const URL = win().URL;
  const blob = isBlob(text) ? text : new Blob([text], option);
  const url = URL.createObjectURL(/** @type {Blob}*/ (blob));
  const link = /** @type {HTMLLinkElement}*/ (
    create("a")()({
      download: fileName || getRandomId(),
      href: url,
    })
  );
  inject()(link);
  link.click();
  if (!isKeep) {
    remove(link);
    URL.revokeObjectURL(url);
  }
};

export default execDownload;
