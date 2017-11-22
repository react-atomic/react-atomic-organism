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
      const nodeGroup = get(popupNode, ['props', 'group']); 
      const shows = state.get(SHOW_KEY).set(key, true);
      const nodes = state.get(NODE_KEY).set(key, popupNode);
      if (nodeGroup) {
        set(groups, [nodeGroup, key], true);
      }
      return state.set(SHOW_KEY, shows).
        set(NODE_KEY, nodes).
        //force update
        set('default', !state.get('default'));
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
      const node = state.get(NODE_KEY).delete(key);
      const shows = state.get(SHOW_KEY).delete(key);
      return state.set(SHOW_KEY, shows).
        set(NODE_KEY, node);
  }

  cleanGroup(state, action)
  {

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
