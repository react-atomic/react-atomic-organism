import React, { useState } from "react";
import XIco from "ricon/X";
import get from "get-object-value";
import callfunc from "call-func";
import { mixClass } from "react-atomic-molecule";
import { useMounted } from "reshow-hooks";

import PopupModal from "../molecules/PopupModal";
import DisplayPopupEl from "../organisms/DisplayPopupEl";
import { popupDispatch } from "../../src/stores/popupStore";

const DefaultXIcon = (props) => {
  const [hoverStyle, setHoverStyle] = useState();
  const _mounted = useMounted();

  const xIcoEnter = () => {
    if (_mounted()) {
      setHoverStyle(Styles.xIcoHover);
    }
  };

  const xIcoLeave = () => {
    if (_mounted()) {
      setHoverStyle(null);
    }
  };

  return (
    <XIco
      {...props}
      onMouseEnter={xIcoEnter}
      onMouseLeave={xIcoLeave}
      style={{
        ...Styles.x,
        ...props.style,
        ...hoverStyle,
      }}
      size="75px"
      weight=".1rem"
    />
  );
};

const FullScreen = ({
  name = "fullscreen",
  children,
  className,
  style,
  onClose,
  toPool,
}) => {
  const xico = <DefaultXIcon />;
  return (
    <DisplayPopupEl>
      <PopupModal
        name={name + " (modal)"}
        appear="fadeIn-500"
        enter="fadeIn-500"
        className={mixClass("full-screen", className)}
        scrolling={true}
        style={{ ...Styles.container, ...style }}
        modalClassName="basic"
        modalStyle={Styles.modal}
        modal={children}
        closeEl={xico}
        onClose={onClose}
        toPool={toPool}
      />
    </DisplayPopupEl>
  );
};

export default FullScreen;

const Styles = {
  container: {
    background: "#fff",
    textAlign: "left",
    padding: 0,
  },
  x: {
    width: "70px",
    height: "75px",
    borderRadius: "8px",
    backgroundColor: "rgba(190,190,190,.39)",
    top: "20px",
    right: "20px",
    opacity: ".3",
  },
  xIcoHover: {
    opacity: ".9",
  },
};
