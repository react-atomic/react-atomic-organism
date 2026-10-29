import { test, expect } from "bun:test";
import { hexToDec, hexToRgba, lightenColor } from "../build/cjs/src/index.js";

test("hexToDec converts 6 and 3 digit hex", () => {
  expect(hexToDec("#ff8000")).toEqual([255, 128, 0]);
  expect(hexToDec("#fff")).toEqual([255, 255, 255]);
});

test("hexToRgba builds an rgba string", () => {
  expect(hexToRgba("#ff0000", 0.5)).toBe("rgba(255,0,0,0.5)");
});

test("lightenColor lightens and clamps", () => {
  expect(lightenColor("#000000", 16, 1000)).toBe("#101010");
  expect(lightenColor("#ffffff", 16, 1000)).toBe("#ffffff");
});
