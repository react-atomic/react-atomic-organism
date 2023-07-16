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

  it("basic test", () => {
    const wrap = render(
      <PopupMonitor>
        <div />
      </PopupMonitor>
    );
    expect(wrap.html()).to.have.string("popup-monitor");
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
    await waitFor(() => {
      act(() => expect(wrap.html()).to.have.string("test-popup"));
    });
    await act(() => {
      gSet({ ids: [] });
    });
    await act();
    await waitFor(() => {
      act(() => expect(wrap.html()).to.equal(expectedWithoutPopup));
    });
  });
});
