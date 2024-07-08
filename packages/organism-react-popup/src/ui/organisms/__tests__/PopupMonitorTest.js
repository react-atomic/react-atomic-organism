import React, { useState, useEffect } from "react";
import { expect } from "chai";
import { act, render, waitFor } from "reshow-unit";

import PopupMonitor from "../PopupMonitor";
import PopupPool from "../PopupPool";
import popupStore, { popupDispatch } from "../../../stores/popupStore";

describe("Test PopupMonitor", () => {
  beforeEach(() => {
    popupStore.reset();
    popupDispatch("dom/cleanAll");
  });

  it("basic test", async () => {
    const wrap = render(
      <PopupMonitor>
        <div />
      </PopupMonitor>
    );
    await waitFor(
      () => expect(wrap.html()).to.have.string("popup-monitor"),
      1000
    );
    await waitFor(() => wrap.unmount(), 1000);
  });

  it("feature test", async () => {
    const expectedWithoutPopup =
      '<div><div class="popup-monitor ui">Test Monitor</div></div>';
    const FakeDom = (props) => {
      const [id, setId] = useState();
      useEffect(() => {
        setId("foo");
      }, []);

      return (
        <div>
          <PopupMonitor
            ids={props.ids || ["foo"]}
            id={id}
            getIsShow={(props) => {
              const { id, ids } = props;
              delete props["id"];
              delete props["ids"];
              if (-1 !== ids.indexOf(id)) {
                return true;
              }
            }}
            popup="test-popup"
          >
            Test Monitor
          </PopupMonitor>
          <PopupPool />
        </div>
      );
    };
    let gSet;
    const Comp = () => {
      const [props, setProps] = useState();
      gSet = setProps;
      return <FakeDom {...props} />;
    };

    const wrap = render(<Comp />);
    await act();
    await waitFor(() => {
      expect(wrap.html()).to.have.string("test-popup");
    }, 1000);
    await act();
    await act(() => {
      gSet({ ids: [] });
    });
    await act();
    await waitFor(() => {
      act(() => expect(wrap.html()).to.equal(expectedWithoutPopup));
    }, 500);
    await waitFor(() => wrap.unmount());
  });
});
