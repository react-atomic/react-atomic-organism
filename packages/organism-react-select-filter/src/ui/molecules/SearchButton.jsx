import { useLazyInject, SemanticUI, Icon } from "react-atomic-molecule";
import SearchIcon from "ricon/Search";

import KeyButton from "../molecules/KeyButton";

const SearchButton = ({ keys = [], style = {}, ...restProps }) => {
  injects = useLazyInject(InjectStyles, injects);
  return (
    <SemanticUI
      {...restProps}
      ui={false}
      atom="button"
      style={{...Styles.button, ...style}}
      className="search-button"
    >
      <Icon>
        <SearchIcon />
      </Icon>
      {keys.map((name, key) => (
        <KeyButton name={name} key={key} />
      ))}
    </SemanticUI>
  );
};

export default SearchButton;

const Styles = {
  button: {
    verticalAlign: "middle",
    border: "0 solid #fff",
    height: 40,
    minWidth: 48,
    borderRadius: 9999,
    boxShadow:
      "0 4px 11px -2px rgb(37 44 97 / 15%), 0 1px 3px 0 rgb(93 100 148 / 20%)",
    backgroundImage: "linear-gradient(rgb(255, 255, 255), rgba(245, 245, 250))",
    cursor: "pointer",
  },
};

let injects;
const InjectStyles = {
  hover: [
    {
      boxShadow:  
        "0 8px 22px 0 rgb(37 44 97 / 15%), 0 4px 6px 0 rgb(93 100 148 / 20%) !important",
    },
    ".search-button:hover"
  ],
};
