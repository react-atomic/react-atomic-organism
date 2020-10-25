import { expect } from "chai";

import getCookie, { getCookieRegString, getCookieReg } from "../index.js";

describe("test get cookie", () => {
  it("get cookie string", () => {
    const n = getCookieRegString("?");
    expect(n).to.equal("(?:^|;)\\s?\\?=([^;]+)");
  });

  it("get cookie reg", () => {
    const n = getCookieReg("?");
    expect("?=xxx").to.match(n);
  });

  it("get cookie", () => {
    let cookie =
      "csrftoken=Ly6OXDBtwNOVYa411Pb9zEVSjzp9HwN5Kcel7wUslGPXpGQKqSKOSVvzB7dUc6yy; token=ufnhbb0vpybhu411ggye5wa96aeo77ll";
    const csrftoken = getCookie("csrftoken", cookie);
    const token = getCookie("token", cookie);

    expect(csrftoken).to.equal(
      "Ly6OXDBtwNOVYa411Pb9zEVSjzp9HwN5Kcel7wUslGPXpGQKqSKOSVvzB7dUc6yy"
    );
    expect(token).to.equal("ufnhbb0vpybhu411ggye5wa96aeo77ll");
  });

  it("get not exists cookie", () => {
    const cookie = " ";
    const result = getCookie("foo", cookie);
    expect(result).to.equal(null);
  });
});
