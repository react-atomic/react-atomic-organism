import React, {
  useImperativeHandle,
  useState,
  useEffect,
  forwardRef,
} from "react";
import Line from "../organisms/Line";
const keys = Object.keys;

const LineList = forwardRef((props, ref) => {
  const {lines, lineDefaultProps, host} = props;
  const arrLineEl = [];
  let hoverLineEl;
  keys(lines).forEach((key) => {
    const lineProps = lines[key];
    const isHover = host.oConn.getIsHover(key);
    const lineEl = (
      <Line
        {...lineDefaultProps}
        {...lineProps}
        id={key}
        key={key}
        host={host}
      />
    );
    if (isHover) {
      hoverLineEl = lineEl;
    } else {
      arrLineEl.push(lineEl);
    }
  });
  if (hoverLineEl) {
    arrLineEl.push(hoverLineEl);
  }
  return arrLineEl;
});

LineList.displayName = "LineList";

export default LineList;
