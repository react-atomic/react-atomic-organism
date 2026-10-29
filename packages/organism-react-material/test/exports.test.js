import { test, expect } from "bun:test";
import * as material from "../build/cjs/src/index.js";

test("exports MaterialInput", () => {
  expect(material.MaterialInput).toBeDefined();
});
