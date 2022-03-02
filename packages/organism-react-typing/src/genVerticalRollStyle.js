import { reactStyle } from "react-atomic-molecule";
import anyToArray from "with-array";
const genVerticalRollStyle = (rows, height, eachRowStaySec) => {
  const rowsLen = anyToArray(rows).length;
  if (!rowsLen) {
    return;
  }
  const aniName = "verticalRoll";
  const styleId = aniName + "-rows-" + rowsLen + "-height-" + height;
  const aniStyle = reactStyle(
    {
      position: "relative",
      animation: [
        `${styleId} ${
          rowsLen * 2 * eachRowStaySec
        }s steps(${rowsLen}) infinite`,
      ],
      height,
      transform: ["rotateZ(360deg)"],
    },
    null,
    false
  );
  reactStyle(
    [{ top: 0 }, { top: 0 - height * rowsLen }],
    ["@keyframes " + styleId, "0%", "100%"],
    styleId
  );
  return aniStyle;
};

export default genVerticalRollStyle;
