import { mixClass, SemanticUI, Icon } from "react-atomic-molecule";

import Search from "ricon/Search";

const NotFoundComponent = (props) => (
  <SemanticUI
    {...props}
    className={mixClass("menu", props.className)}
    style={{ ...props.style, ...Styles.cleanMenuStyle }}
  >
    <Icon style={Styles.icon}>
      <Search />
    </Icon>
    <SemanticUI style={Styles.text}>No matching results</SemanticUI>
  </SemanticUI>
);

export default NotFoundComponent;

const Styles = {
  icon: {
    display: "block",
    width: "8rem",
    margin: "2rem auto",
    opacity: 0.6,
  },
  text: {
    fontSize: "1.5rem",
    textAlign: "center",
  },
  cleanMenuStyle: {
    overflow: "hidden",
    paddingBottom: 10,
    borderBottom: "none",
    boxShadow: "none",
    boxSizing: "inherit",
    maxHeight: "inherit",
  },
};
