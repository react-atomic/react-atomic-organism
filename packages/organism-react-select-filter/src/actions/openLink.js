import {win, doc} from "win-doc";
const openLink = (link, bOpenToNew) => {
  if (bOpenToNew) {
    win().open(link, "_blank");
  } else {
    doc().location = link; 
  }
};

export default openLink;
