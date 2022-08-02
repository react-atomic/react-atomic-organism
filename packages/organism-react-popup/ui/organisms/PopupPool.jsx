import { useEffect, useMemo } from "react";
import { build, mixClass, SemanticUI } from "react-atomic-molecule";
import { useReturn, useParticalRender } from "reshow-return";
import { equal } from "reshow-flux";

import popupStore, { SHOW_ONE, NODE_KEY } from "../../src/stores/popupStore";

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
  const [renderComponent, particalRender, setRenderKeys] = useParticalRender();

  const state = useReturn([NODE_KEY, SHOW_ONE], popupStore);

  useEffect(() => {
    const nextPops = getPops(state[NODE_KEY], name);
    const popsKeys = nextPops.keySeq();
    setRenderKeys((prev) => (!equal(prev, popsKeys) ? popsKeys : prev));
    const updateKey = state[SHOW_ONE];
    if (nextPops.has(updateKey)) {
      particalRender({ [updateKey]: nextPops.get(updateKey) });
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
