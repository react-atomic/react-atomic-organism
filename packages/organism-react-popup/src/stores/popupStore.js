// @ts-check

/***
 * reshow-flux-base/ActionObject
 *
 * @typedef {import('reshow-flux-base').ActionObject} ActionObject
 */

/***
 * reshow-flux/StateMap
 *
 * @typedef {import('reshow-flux').StateMap} StateMap
 */

import { Map, ImmutableStore, mergeMap } from "reshow-flux";
import get from "get-object-value";
import set from "set-object-value";
import { KEYS, IS_ARRAY, OBJECT, NEW_OBJ } from "reshow-constant";

const groups = NEW_OBJ();
const SHOW_NEXT = "show_next";
const SHOW_KEY = "shows";
const NODE_KEY = "nodes";

/**
 * @param {any} node
 * @param {string|null} defaultVal
 * @returns {string}
 */
const getName = (node, defaultVal = "default") => {
  const name = get(node, ["props", "name"], () => {
    return get(node, ["type", "displayName"], () => {
      return get(node, ["type", "name"], defaultVal);
    });
  });
  return name;
};

class handlePopup {
  /**
   * @param {StateMap} state
   * @param {ActionObject} action
   */
  updateDom(state, action) {
    const popupNode = get(action, ["params", "popup"]);
    const key = getName(popupNode);
    if (key !== getName(popupNode, null)) {
      console.warn({
        Warn: "Popup Key not consistence, you use a default key. you should assign name to each specific popup element.",
        PopUp: popupNode,
        ActualKey: key,
      });
    }
    const shows = state.get(SHOW_KEY).set(key, true);
    const nodes = state.get(NODE_KEY).set(key, popupNode);
    let nodeGroups = get(popupNode, ["props", "group"]);
    if (nodeGroups) {
      if (!IS_ARRAY(nodeGroups)) {
        nodeGroups = [nodeGroups];
      }
      nodeGroups.forEach((/**@type string*/ nodegroup) =>
        set(groups, [nodegroup, key], true)
      );
    }
    return state.set(SHOW_KEY, shows).set(NODE_KEY, nodes).set(SHOW_NEXT, key);
  }

  /**
   * @param {ActionObject} action
   */
  getKey(action) {
    const popup = get(action, ["params", "popup"], "default");
    let key;
    if (OBJECT === typeof popup) {
      key = getName(popup, popup);
    } else {
      key = popup;
    }
    return key;
  }

  /**
   * @param {StateMap} state
   * @param {ActionObject} _action
   */
  closeAll(state, _action) {
    return state.set(SHOW_KEY, Map());
  }

  /**
   * @param {StateMap} state
   * @param {ActionObject} action
   */
  closeOne(state, action) {
    const key = this.getKey(action);
    const shows = state.get(SHOW_KEY).delete(key);
    return state.set(SHOW_KEY, shows);
  }

  /**
   * @param {StateMap} state
   * @param {ActionObject} action
   */
  closeGroup(state, action) {
    const groupKey = get(action, ["params", "group"]);
    const group = get(groups, [groupKey]);
    let shows = state.get(SHOW_KEY);
    if (group) {
      KEYS(group).forEach((key) => {
        shows = shows.delete(key);
      });
    }
    return state.set(SHOW_KEY, shows);
  }

  /**
   * @param {StateMap} state
   * @param {ActionObject} _action
   */
  cleanAll(state, _action) {
    return state.set(SHOW_KEY, Map()).set(NODE_KEY, Map());
  }

  /**
   * @param {StateMap} state
   * @param {ActionObject} action
   */
  cleanOne(state, action) {
    const key = this.getKey(action);
    const nodes = state.get(NODE_KEY).delete(key);
    const shows = state.get(SHOW_KEY).delete(key);
    return state.set(NODE_KEY, nodes).set(SHOW_KEY, shows);
  }

  /**
   * @param {StateMap} state
   * @param {ActionObject} action
   */
  cleanGroup(state, action) {
    const groupKey = get(action, ["params", "group"]);
    const group = get(groups, [groupKey]);
    if (group) {
      let nodes = state.get(NODE_KEY);
      let shows = state.get(SHOW_KEY);
      KEYS(group).forEach((key) => {
        nodes = nodes.delete(key);
        shows = shows.delete(key);
      });
      return state.set(NODE_KEY, nodes).set(SHOW_KEY, shows);
    } else {
      return state;
    }
  }
}

const oPopup = new handlePopup();
const [store, popupDispatch] = ImmutableStore(
  (/**@type StateMap*/ state, /**@type ActionObject*/ action) => {
    switch (action.type) {
      case "dom/update":
        return oPopup.updateDom(state, action);
      case "dom/closeAll":
        return oPopup.closeAll(state, action);
      case "dom/cleanAll":
        return oPopup.cleanAll(state, action);
      case "dom/closeOne":
        return oPopup.closeOne(state, action);
      case "dom/cleanOne":
        return oPopup.cleanOne(state, action);
      case "dom/closeGroup":
        return oPopup.closeGroup(state, action);
      case "dom/cleanGroup":
        return oPopup.cleanGroup(state, action);
      case "config/set":
        return mergeMap(state, action.params);
      default:
        return state;
    }
  },
  /**@type StateMap*/ (Map({ shows: Map(), nodes: Map() }))
);

export default store;
export { popupDispatch, SHOW_NEXT, SHOW_KEY, NODE_KEY };
