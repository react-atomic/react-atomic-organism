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
 * @param {string|Blob} textOrBlob
 * @param {string} [fileName]
 * @param {any} [option]
 * @param {boolean} [isKeep]
 */
const execDownload = (textOrBlob, fileName, option, isKeep) => {
  const URL = win().URL;
  const blob = isBlob(textOrBlob) ? textOrBlob : new Blob([textOrBlob], option);
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
