// @ts-check

import { expect } from "chai";

import { toTailwindObj } from "../toTailwind";

describe("Test Tailwind Obj", () => {
  it("basic test", () => {
    const actual = toTailwindObj(
      "w-full p-4 text-sm bg-gray-50 focus:outline-none border border-gray-200 rounded text-gray-600"
    );
    expect(actual).to.deep.equals({
      w: "full",
      p: "4",
      text: "gray-600",
      bg: "gray-50",
      "focus:outline": "none",
      border: "gray-200",
      rounded: true,
    });
  });
});
