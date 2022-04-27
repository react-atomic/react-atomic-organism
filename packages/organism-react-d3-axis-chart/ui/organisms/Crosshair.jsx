import { useReturn } from "reshow-return";
import Line from "../molecules/Line";
import Group from "../molecules/Group";

const CrossLine = (props) => (
  <Line {...props} strokeWidth="3" strokeDasharray="5,5" />
);

const Crosshair = (props) => {
  const { scaleW, scaleH, reducer, subReducer } = props;
  const {
    crosshairX: x,
    crosshairY: y,
    hideCrosshairY: hideY,
  } = useReturn(["crosshairX", "crosshairY", "hideCrosshairY"], reducer[0]);

  const { hideCrosshairX: hideX } = useReturn(
    ["hideCrosshairX"],
    subReducer[0]
  );

  let xline = null;
  let yline = null;
  if (!hideX && y) {
    xline = (
      <CrossLine className="x" start={{ x: 0, y }} end={{ x: scaleW, y: y }} />
    );
  }
  if (!hideY && x) {
    yline = (
      <CrossLine className="y" start={{ x, y: 0 }} end={{ x: x, y: scaleH }} />
    );
  }
  return (
    <Group className="crosshair">
      {xline}
      {yline}
    </Group>
  );
};

export default Crosshair;
