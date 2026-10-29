import { test, expect } from "bun:test";
import * as orgchart from "../build/cjs/src/index.js";

test("exports OrgChart components", () => {
  expect(orgchart.OrgChart).toBeDefined();
  expect(orgchart.OrgChartGroup).toBeDefined();
  expect(orgchart.OrgChartItem).toBeDefined();
});
