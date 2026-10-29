import { test, expect } from "bun:test";
import * as geo from "../build/cjs/src/index.js";

test("exports GetLocation", () => {
  expect(geo.GetLocation).toBeDefined();
});
