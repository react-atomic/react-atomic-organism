import React, { useState, useEffect } from "react";
import Line from "../organisms/Line";
const keys = Object.keys;

const LineList = (props) => {
  const { lines, lineDefaultProps, host } = props;
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
};

export default LineList;
