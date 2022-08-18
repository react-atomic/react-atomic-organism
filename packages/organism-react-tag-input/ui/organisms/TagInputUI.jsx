import { Suggestion } from "react-atomic-organism";
import {
  build,
  useLazyInject,
  mixClass,
  List,
  Field,
  SemanticUI,
} from "react-atomic-molecule";

const TagInputUI = (props) => {
  injects = useLazyInject(InjectStyles, injects);
  const {
    fluid,
    groupTags,
    name,
    itemFilter,
    itemLocator,
    itemsLocator,
    onItemClick,
    onKeyDown,
    onBlur,
    onFocus,
    onGetSugg,
    results,
    disabled,
    tagList,
  } = props;
  const classes = mixClass("tags-input", {
    fluid,
  });
  return (
    <Suggestion
      filter
      disabled={disabled}
      compHd={tagList}
      ref={onGetSugg}
      className={classes}
      inputComponent={SemanticUI}
      style={Styles.input}
      wrapStyle={Styles.wrap}
      onItemClick={onItemClick}
      itemFilter={itemFilter}
      itemLocator={itemLocator}
      itemsLocator={itemsLocator}
      results={results}
      onSubmit={false}
      onKeyDown={onKeyDown}
      onBlur={onBlur}
      onFocus={onFocus}
    />
  );
};

export default TagInputUI;

const Styles = {
  wrap: {
    border: "1px solid rgba(34,36,38,.15)",
    borderRadius: ".28571429rem",
    padding: "1px 0",
    width: "100%",
    cursor: "text",
    position: "relative",
    boxSizing: "border-box",
  },
  input: {
    border: "none",
    width: "auto",
    maxWidth: "100%",
    maxHeight: "100%",
    margin: 0,
  },
  list: {
    padding: 0,
    margin: 0,
    display: "inline",
    pointerEvents: "all",
  },
};

let injects;
const InjectStyles = {
  error: [
    { background: "#fff6f6", borderColor: "#e0b4b4" },
    ".field.error.ui .tags-field.ui",
  ],
};
