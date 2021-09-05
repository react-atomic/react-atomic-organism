import React, { PureComponent } from "react";
import { PopupModal, PopupFloatEl } from "organism-react-popup";

class Tooltip extends PureComponent {
  render() {
    const {
      wh,
      maskScroll,
      targetEl,
      isSetFixed,
      modalStyle,
      children,
      name,
      ...props
    } = this.props;
    let floatClassName;
    if (isSetFixed) {
      floatClassName = "react-onboarding-fixed";
    }
    return (
      <div>
        <PopupModal
          {...props}
          name={name}
          modal={null}
          maskScroll={maskScroll}
        />
        <PopupFloatEl
          name={name}
          style={{ ...modalStyle, zIndex: 99999 }}
          targetEl={targetEl}
          className={floatClassName}
          alignParams={{ positionFixed: true }}
        >
          {children}
        </PopupFloatEl>
      </div>
    );
  }
}

export default Tooltip;
