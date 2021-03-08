import React, {
  useImperativeHandle,
  useState,
  useEffect,
  forwardRef,
} from "react";

import { build } from "react-atomic-molecule";

import LineDefaultLayout from "../molecules/LineDefaultLayout";

const Line = forwardRef((props, ref) => {
  const {
    start: propsStart,
    end: propsEnd,
    props: paramProps,
    init,
    host,
    component,
    ...other
  } = props;
  const [isHover, setIsHover] = useState();
  const [start, setStart] = useState(propsStart);
  const [end, setEnd] = useState(propsEnd);
  useImperativeHandle(ref, () => expose);
  const expose = {
    getId: () => props.id,
    getFromTo: () => ({ from: props.from, to: props.to }),
    getIsHover: () => isHover,
    setStart,
    setEnd,
  };

  useEffect(() => {
    setStart(propsStart);
  }, [propsStart]);

  useEffect(() => {
    setEnd(propsEnd);
  }, [propsEnd]);

  useEffect(()=>{
    const lineId = expose.getId();
    host.oConn.setLineObj(lineId, expose);
  }, []);

  const handleClick = (e) => {
    e.preventDefault();
    const lineId = expose.getId();
    host.handleLineEdit({
      ref: expose,
      lineId,
      lineData: host.oConn.getLine(lineId),
    });
  };

  const handleDeleteButtonClick = (e) => {
    e.preventDefault();
    const lineId = expose.getId();
    host.handleLineDel({
      ref: expose,
      lineId,
      lineData: host.oConn.getLine(lineId),
    });
  };

  const handleMouseEnter = (e) => {
    if (!host.getConnectStartPoint()) {
      setIsHover(true);
    }
  };

  const handleMouseLeave = (e) => {
    if (!host.getConnectStartPoint()) {
      setIsHover(false);
    }
  };

  return build(component)({
    ...other,
    start,
    end,
    isHover,
    onClick: handleClick,
    onDeleteButtonClick: handleDeleteButtonClick,
    onMouseEnter: handleMouseEnter,
    onMouseLeave: handleMouseLeave,
  });
});

Line.displayName = "Line";

Line.defaultProps = {
  component: LineDefaultLayout,
};

export default Line;
