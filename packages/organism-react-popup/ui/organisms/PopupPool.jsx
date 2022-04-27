import { useState, useEffect, useMemo } from "react";
import { build, mixClass, SemanticUI } from "react-atomic-molecule";
import Return, { useReturn } from "reshow-return";
import { equal, useReduceStore } from "reshow-flux";

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

const PopupPool = ({ name, component = SemanticUI, ...otherProps }) => {
  const [poolStore, setPoolStore] = useReduceStore();
  const [pops, setPops] = useState();
  const state = useReturn([NODE_KEY, SHOW_ONE], popupStore);
  useEffect(() => {
    const nextPops = getPops(state[NODE_KEY], name);
    const popsKeys = nextPops.keySeq();
    setPops((prev) => (!equal(prev, popsKeys) ? popsKeys : prev));
    const updateKey = state[SHOW_ONE];
    if (nextPops.has(updateKey)) {
      setPoolStore({ [updateKey]: nextPops.get(updateKey) });
    }
  }, [state[NODE_KEY]]);
  return useMemo(() => {
    const buildReturn = build(build(Return)({ store: poolStore }));
    return build(component)(
      {
        name,
        className: mixClass(name, "popup-pool"),
        ui: false,
        ...otherProps,
      },
      (pops || []).map((name) =>
        buildReturn(
          { key: name, name, initStates: [name] },
          (props) => props[props.name] || null
        )
      )
    );
  }, [pops]);
};

export default PopupPool;
