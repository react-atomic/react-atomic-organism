// @ts-check

import { useSortItems } from "../SortList";
import { render, act } from "reshow-unit";
import { expect } from "chai";
import * as React from "react";
const { useEffect } = React;

describe("useSortItems Test", () => {
  it("Basic Test", async () => {
    const Dom = () => {
      const raw = [5, 4, 3, 2, 1];
      const { items, setSortData } = useSortItems({
        items: raw,
        sortIdLocator: (i) => i,
      });
      useEffect(()=>{
        setSortData({
          sortId: 1,
          targetId: 3,
          sortEl: null,
          targetEl: null,
          reverseOrder: true,
          isDraging: false
        });
      }, []);
      return <div>{items}</div>;
    };
    const wrap = render(<Dom />);
    await act(()=>{
      expect(wrap.html()).to.equal("<div>54132</div>")
    }, 100);
  });
});
