import React, {
  forwardRef,
  useImperativeHandle,
  useState,
  useRef,
  useEffect,
} from "react";
import callfunc from "call-func";
import Line from "../organisms/Line";
const keys = Object.keys;

const LineList = forwardRef((props, ref) => {
  const { lineDefaultProps, host } = props;
  const [lines, setLines] = useState([]);
  const setLinesCb = useRef([]);
  const lastLines = useRef();
  const expose = {
    setLines,
    getLines: () => lastLines.current,
    addUpdateCb: (cb) => {
      setLinesCb.current.push(cb);
    },
  };
  useImperativeHandle(ref, () => expose);
  useEffect(() => {
    lastLines.current = lines;
    setTimeout(() => {
      setLinesCb.current.forEach((cb) => callfunc(cb));
      setLinesCb.current = [];
    });
  }, [lines]);
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
