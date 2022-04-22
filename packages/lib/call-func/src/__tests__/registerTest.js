import { expect } from "chai";
import { cleanIt } from "reshow-unit";
import { create, inject } from "create-el";
import query from "css-query-selector";

import { register, cleanAllRegister } from "../register";

const keys = Object.keys;

describe("Test Register", () => {
  afterEach(() => cleanIt());

  it("basic test", () => {
    const span = create("span")()({ id: "unit-span" });
    inject()(span);
    const oReg = register(span);
    let i = 0;
    const evId = oReg.addEventListener("click", () => {
      i++;
    });
    const click = new Event("click");
    span.dispatchEvent(click);
    expect(i).to.equal(1);
    span.dispatchEvent(click);
    oReg.removeEventListener(evId);
    span.dispatchEvent(click);
    expect(i).to.equal(2);
  });

  it("Compatiable with native event", () => {
    const span = create("span")()({ id: "unit-span" });
    inject()(span);
    let i = 0;
    const func = () => {
      i++;
    };
    register(span).addEventListener("click", func);
    span.dispatchEvent(new Event("click"));
    expect(i).to.equal(1);
    span.dispatchEvent(new Event("click"));
    expect(i).to.equal(2);
    register(span).removeEventListener("click", func);
    span.dispatchEvent(new Event("click"));
    expect(i).to.equal(2);
  });

  it("Test clean all with one element", () => {
    const span = create("span")()({ id: "unit-span" });
    inject()(span);
    let i = 0;
    const func = () => {
      i++;
    };
    expect(keys(register(span).optionMap).length).to.equal(0);
    register(span).addEventListener("click", func);
    span.dispatchEvent(new Event("click"));
    expect(i).to.equal(1);
    expect(keys(register(span).optionMap).length).to.equal(1);
    span.dispatchEvent(new Event("click"));
    expect(i).to.equal(2);
    register(span).cleanAll();
    expect(keys(register(span).optionMap).length).to.equal(0);
    span.dispatchEvent(new Event("click"));
    expect(i).to.equal(2);
  });

  it("Test cleanAll with type", () => {
    const span = create("span")()();
    inject()(span);
    let i = 0;
    const func = () => {
      i++;
    };
    register(span).addEventListener("click", func);
    register(span).addEventListener("mousedown", func);
    span.dispatchEvent(new Event("click"));
    expect(i).to.equal(1);
    span.dispatchEvent(new Event("mousedown"));
    expect(i).to.equal(2);
    register(span).cleanAll("click");
    span.dispatchEvent(new Event("click"));
    expect(i).to.equal(2);
    span.dispatchEvent(new Event("mousedown"));
    expect(i).to.equal(3);
  });

  it("Test cleanAllRegister", () => {
    const span = create("span")()();
    const div = create("div")()();
    inject()(span);
    inject()(div);
    let i = 0;
    const func = () => {
      i++;
    };
    register(span).addEventListener("click", func);
    register(div).addEventListener("click", func);
    span.dispatchEvent(new Event("click"));
    expect(i).to.equal(1);
    div.dispatchEvent(new Event("click"));
    expect(i).to.equal(2);
    cleanAllRegister();
    span.dispatchEvent(new Event("click"));
    div.dispatchEvent(new Event("click"));
    expect(i).to.equal(2);
  });

  it("Test with document", () => {
    let i = 0;
    const func = () => {
      i++;
    };
    register(document).addEventListener("click", func);
    document.dispatchEvent(new Event("click"));
    expect(i).to.equal(1);
  });

  it("Test with window", () => {
    let i = 0;
    const func = () => {
      i++;
    };
    register(window).addEventListener("click", func);
    window.dispatchEvent(new Event("click"));
    expect(i).to.equal(1);
  });
});
