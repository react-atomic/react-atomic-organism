'use strict';

import {Map} from 'immutable';
import {ReduceStore} from 'reshow-flux';
import get from 'get-object-value';
import set from 'set-object-value';
import dispatcher from '../popupDispatcher';

let groups = {};
const SHOW_KEY='shows';
const NODE_KEY='nodes';
const keys = Object.keys;
const isArray = Array.isArray;

class PopupStore extends ReduceStore
{

  getInitialState()
  {
      return Map({shows: Map(), nodes: Map()});
  }

  updateDom(state, action)
  {
      const popupNode = get(action, ['params','popup']);
      const key = get(popupNode, ['props', 'name'], 'default'); 
      if (key !== get(popupNode, ['props', 'name'])) {
        console.warn( {
            Error: 'Popup Key not consistence',
            PopUpKey: get(popupNode, ['props', 'name']),
            ActualKey: key
        } )
      }
      const shows = state.get(SHOW_KEY).set(key, true);
      const nodes = state.get(NODE_KEY).set(key, popupNode);
      let nodeGroups = get(popupNode, ['props', 'group']); 
      if (nodeGroups) {
        if (!isArray(nodeGroups)) {
            nodeGroups = [nodeGroups];
        }
        nodeGroups.forEach(nodegroup => set(groups, [nodegroup, key], true));
      }
      return state.
        set(SHOW_KEY, shows).
        set(NODE_KEY, nodes)
  }

  getKey(action)
  {
    const popup = get(action, ['params','popup'], 'default');
    let key;
    if ('object' === typeof popup) {
        key = get(popup, ['props', 'name'], popup);
    } else {
        key = popup;
    }
    return key;
  }

  closeAll(state, action)
  {
      return state.set(SHOW_KEY, Map());
  }

  closeOne(state, action)
  {
      const key = this.getKey(action);
      const shows = state.get(SHOW_KEY).delete(key);
      return state.set(SHOW_KEY, shows);
  }

  closeGroup(state, action)
  {
      const groupKey = get(action, ['params','group']);
      const group = get(groups, [groupKey]);
      let shows = state.get(SHOW_KEY);
      if (group) {
        keys(group).forEach(key=>{
            shows = shows.delete(key);  
        });
      }
      return state.set(SHOW_KEY, shows);
  }

  cleanAll(state, action)
  {
      return state.set(SHOW_KEY, Map()).
        set(NODE_KEY, Map());
  }

  cleanOne(state, action)
  {
      const key = this.getKey(action);
      const nodes = state.get(NODE_KEY).delete(key);
      const shows = state.get(SHOW_KEY).delete(key);
      return state.
        set(NODE_KEY, nodes).
        set(SHOW_KEY, shows);
  }

  cleanGroup(state, action)
  {
      const groupKey = get(action, ['params','group']);
      const group = get(groups, [groupKey]);
      if (group) {
          let nodes = state.get(NODE_KEY);
          let shows = state.get(SHOW_KEY);
          keys(group).forEach( key => {
              nodes = nodes.delete(key);  
              shows = shows.delete(key);  
          });
          return state.
              set(NODE_KEY, nodes).
              set(SHOW_KEY, shows);
      } else {
          return state;
      }
  }

  reduce (state, action)
  {
      switch (action.type)
      {
          case 'dom/update':
              return this.updateDom(state, action);
          case 'dom/closeAll':
              return this.closeAll(state, action);
          case 'dom/cleanAll':
              return this.cleanAll(state, action);
          case 'dom/closeOne':
              return this.closeOne(state, action);
          case 'dom/cleanOne':
              return this.cleanOne(state, action);
          case 'dom/closeGroup':
              return this.closeGroup(state, action);
          case 'dom/cleanGroup':
              return this.cleanGroup(state, action);
          case 'config/set':
              return state.merge(action.params);
          default:
              return state;
      }
  }
}

// Export a singleton instance of the store, could do this some other way if
// you want to avoid singletons.
const instance = new PopupStore(dispatcher);
export default instance;
