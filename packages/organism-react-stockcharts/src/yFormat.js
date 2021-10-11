import { round } from "to-percent-js";

const yFormat = (d) => {
  const roundNum = round(d);
  if ((roundNum + "").length > 6) {
    return round(d, 0);
  } else {
    return roundNum;
  }
};

export default yFormat;
