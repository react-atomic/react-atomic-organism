"use strict";

import { hexToDec } from "./index";

const lightenColor = (hex, lum, threshold) => {
  let rgb = "#";
  lum = lum || 0;
  const decColors = hexToDec(hex);
  if ("undefined" !== threshold) {
    let total = 0;
    decColors.forEach((c) => {
      total += c;
    });
    if (total > threshold) {
      lum = 0 - lum; // Darken
    }
  }
  decColors.forEach((c) => {
    c = c + lum;
    if (c < 0) {
      c = 0;
    }
    if (c > 255) {
      c = 255;
    }
    c = c.toString(16);
    rgb += ("00" + c).substr(c.length);
  });
  return rgb;
};

export default lightenColor;
