import { Children } from "react";

import { build, mixClass, SemanticUI } from "react-atomic-molecule";

import get from "get-object-value";

const Breadcrumb = (props) => {
  const { className, children, divider, dividerStyle, style, ...reset } = props;
  const itemList = [];
  const defaultDivider = build(divider || <SemanticUI> / </SemanticUI>);

  Children.forEach(children, (node, k) => {
    if (!node) {
      return;
    }
    const nodeProps = get(node, ["props"], {});
    itemList.push(
      build(node)({
        key: k,
        className: mixClass(nodeProps.className, "section"),
      })
    );
    const nodeDataDivider = nodeProps["data-divider"];
    const thisDivider = nodeDataDivider
      ? build(nodeDataDivider)
      : defaultDivider;
    const dividerProps = get(divider, ["props"], () =>
      get(nodeProps.divider, ["props"], {})
    );
    itemList.push(
      thisDivider({
        key: k + "-div",
        style: { ...dividerProps.style, ...dividerStyle },
        className: mixClass(dividerProps.className, "divider"),
      })
    );
  });
  if (itemList.length) {
    itemList.pop();
  }
  return (
    <SemanticUI
      {...reset}
      style={{ ...Styles.container, ...style }}
      className={mixClass("breadcrumb", className)}
    >
      {itemList}
    </SemanticUI>
  );
};

export default Breadcrumb;

const Styles = {
  container: {
    lineHeight: 1.8,
  },
};
