import { useEffect, useMemo } from "react";
import { build, mixClass, SemanticUI } from "react-atomic-molecule";
import { useReturn, usePartialRender } from "reshow-return";
import { equal } from "reshow-flux";

import popupStore, { SHOW_NEXT, NODE_KEY } from "../../stores/popupStore";

const getPops = (nodes, name) => {
  let pops = nodes;
  nodes.forEach((v, k, item) => {
    const toPool = v.props?.toPool;
    if ((name || toPool) && toPool !== name) {
      pops = pops.delete(k);
    }
  });
  return pops;
};

const PopupPool = ({ component = SemanticUI, name, ...restProps }) => {
  const [renderComponent, partialRender, setRenderKeys] = usePartialRender();

  const state = useReturn([NODE_KEY, SHOW_NEXT], popupStore);

  useEffect(() => {
    const nextPopNodes = getPops(state[NODE_KEY], name);
    const popsKeys = nextPopNodes.keySeq();
    setRenderKeys((prev) => (!equal(prev, popsKeys) ? popsKeys : prev));
    const updateKey = state[SHOW_NEXT];
    if (nextPopNodes.has(updateKey)) {
      partialRender({ [updateKey]: nextPopNodes.get(updateKey) });
    }
  }, [state[NODE_KEY]]);

  return useMemo(
    () =>
      build(component)(
        {
          ...restProps,
          name,
          className: mixClass(name, "popup-pool"),
          ui: false,
        },
        renderComponent
      ),
    [renderComponent]
  );
};

export default PopupPool;
