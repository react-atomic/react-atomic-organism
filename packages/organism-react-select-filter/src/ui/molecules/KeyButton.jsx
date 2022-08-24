import { Unsafe } from "react-atomic-molecule";

const KeyButton = ({ name }) => {
  let displayKey = name;
  switch (name.toLowerCase()) {
    case "meta":
      displayKey = "&#x2318;";
      break;
    case "alt":
      displayKey = "&#x2325;";
      break;
    case "ctrl":
    case "control":
      displayKey = "&#x2303;";
      break;
    case "shift":
      displayKey = "&#x21e7;";
      break;
  }
  return <Unsafe style={Styles.button}>{displayKey}</Unsafe>;
};

export default KeyButton;

const Styles = {
  button: {
    textAlign: "center",
    verticalAlign: "inherit",
    lineHeight: "24px",
    width: 24,
    height: 24,
    display: "inline-block",
    boxShadow:
      "0 4px 11px 0 rgb(37 44 97 / 15%), 0 1px 3px 0 rgb(93 100 148 / 60%)",
    margin: "0 5px",
    backgroundImage:
      "linear-gradient(to top left, rgb(245, 245, 250), rgba(214, 214, 231, 0.6))",
  },
};
