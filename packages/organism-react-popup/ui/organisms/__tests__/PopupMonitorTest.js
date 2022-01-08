import React, { useState, useEffect } from "react";
import { expect } from "chai";
import { mount } from "reshow-unit";

import PopupMonitor from "../PopupMonitor";
import PopupPool from "../PopupPool";
import popupStore, { popupDispatch } from "../../../src/stores/popupStore";

describe("Test PopupMonitor", () => {
  beforeEach(() => {
    popupStore.reset();
    popupDispatch("dom/cleanAll");
  });

  it("basic test", () => {
    const wrap = mount(
      <PopupMonitor>
        <div />
      </PopupMonitor>
    );
    const actual = wrap.html();
    expect(actual).to.have.string("popup-monitor");
  });

  it("feature test", (done) => {
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
    const wrap = mount(<FakeDom />);
    expect(wrap.html()).to.equal(expectedWithoutPopup);
    setTimeout(() => {
      wrap.update();
      expect(wrap.html()).to.have.string("test-popup");
      wrap.setProps({ ids: [] });
      setTimeout(() => {
        wrap.update();
        expect(wrap.html()).to.equal(expectedWithoutPopup);
        done();
      }, 10);
    }, 10);
  });
});
