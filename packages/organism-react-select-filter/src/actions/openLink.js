// @ts-check

import { win, doc } from "win-doc";

/**
 * @param {string} link
 * @param {boolean} bOpenToNew
 * @returns void
 */
const openLink = (link, bOpenToNew = false) => {
  if (bOpenToNew) {
    win().open(link, "_blank");
  } else {
    doc().location = link;
  }
};

export default openLink;
