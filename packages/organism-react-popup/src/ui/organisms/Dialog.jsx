// @ts-check
import * as React from "react";
const { useRef } = React;

import {
  build,
  mixClass,
  Header,
  Content,
  List,
  Button,
} from "react-atomic-molecule";
import { IS_ARRAY } from "reshow-constant";
import callfunc from "call-func";

import PopupModal from "../molecules/PopupModal";

const defaultName = "dialog";

/**
 * @typedef {object} DialogExtraEvent
 * @property {any} button
 */

/**
 * @typedef {DialogExtraEvent & React.MouseEvent} DialogEvent
 */

/**
 * @param {any} props
 */
const Dialog = ({
  name = defaultName,
  i18nNegativeBtn = "No",
  i18nPositiveBtn = "Yes",
  size = "mini",
  disableClose = true,
  className,
  buttons,
  header,
  children,
  onClick,
  ...props
}) => {
  /**
   * @type any
   */
  const thisPopup = useRef();

  const handleClick =
    (/** @type React.ReactElement*/ button) => (/** @type DialogEvent*/ e) => {
      // Locate befor this.popup.close()
      // because need trigger befor onClose
      (e.button = button) && callfunc(onClick, [e]);
      thisPopup.current.close();
    };

  let thisHeader = null;
  if (header) {
    thisHeader = <Header>{header}</Header>;
  }
  let thisButtons = buttons;
  if (!IS_ARRAY(thisButtons) || !thisButtons.length) {
    thisButtons = [
      <Button value={false} className="negative" key="b-negative">
        {i18nNegativeBtn}
      </Button>,
      <Button value={true} className="positive" key="b-positive">
        {i18nPositiveBtn}
      </Button>,
    ];
  }
  thisButtons = thisButtons.map((/** @type React.ReactElement*/ button) =>
    build(button)({
      onClick: handleClick(button),
    })
  );
  const classes = mixClass(className, "dialog", size);
  return (
    <PopupModal
      modalClassName={classes}
      name={name}
      content={false}
      ref={thisPopup}
      disableClose={disableClose}
      {...props}
    >
      {thisHeader}
      <Content>{children}</Content>
      <List type="actions">{thisButtons}</List>
    </PopupModal>
  );
};

Dialog.displayName = defaultName;

export default Dialog;
