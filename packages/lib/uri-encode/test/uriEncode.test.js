import { test, expect } from "bun:test";
import uriencode from "../build/cjs/src/index.js";

test("returns empty values untouched", () => {
  expect(uriencode("")).toBe("");
  expect(uriencode(undefined)).toBeUndefined();
});

test("encodes spaces as + and keeps & [ ]", () => {
  expect(uriencode("a b&c[d]")).toBe("a+b&c[d]");
});

test("replaces # with a full width #", () => {
  expect(uriencode("a#b")).toBe(encodeURIComponent("a＃b"));
});
