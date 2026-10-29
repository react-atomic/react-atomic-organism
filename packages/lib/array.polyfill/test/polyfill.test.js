import { test, expect } from "bun:test";
import "../build/cjs/src/index.js";

test("Array.prototype.includes works", () => {
  expect([1, 2, 3].includes(2)).toBe(true);
  expect([1, 2, 3].includes(4)).toBe(false);
  expect([NaN].includes(NaN)).toBe(true);
  expect([1, 2, 3].includes(1, 1)).toBe(false);
});
