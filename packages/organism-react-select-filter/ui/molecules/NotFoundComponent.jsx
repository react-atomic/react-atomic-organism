import { SemanticUI, Icon } from "react-atomic-molecule";

import Search from "ricon/Search";

const NotFoundComponent = (props) => {
  return (
    <SemanticUI>
      <Icon style={Styles.icon}>
        <Search />
      </Icon>
      <SemanticUI style={Styles.text}>No matching results</SemanticUI>
    </SemanticUI>
  );
};

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
};
