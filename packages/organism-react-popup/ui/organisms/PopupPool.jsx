import React from "react";
import { build, SemanticUI } from "react-atomic-molecule";
import get from "get-object-value";
import Return from "reshow-return";

import popupStore from "../../src/stores/popupStore";

const keys = Object.keys;

const getPops = (nodes, name) => {
  nodes = get(nodes) || {};
  const pops = [];
  keys(nodes).map((key) => {
    const node = nodes[key];
    const nodeProps = get(node, ["props"], {});
    const toPool = nodeProps.toPool;
    if ((name || toPool) && toPool !== name) {
      return;
    }
    pops.push(build(node)({ key }));
  });
  return pops;
};

const PopupPool = ({ name, component = SemanticUI, ...otherProps }) => (
  <Return store={popupStore} initStates={["nodes"]}>
    {({ nodes }) => {
      const pops = getPops(nodes, name);
      if (pops.length) {
        return build(component)(
          {
            "data-name": name,
            className: "popup-pool",
            ui: false,
            ...otherProps,
          },
          pops
        );
      } else {
        return null;
      }
    }}
  </Return>
);

export default PopupPool;
