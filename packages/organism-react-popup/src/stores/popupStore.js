'use strict';

import {Map} from 'immutable';
import {ReduceStore} from 'reduce-flux';
import get from 'get-object-value';
import dispatcher from '../actions/popupDispatcher';

class PopupStore extends ReduceStore
{

  getInitialState()
  {
      return Map({node:Map(), nodes:Map()});
  }

  updateDom(state, action)
  {
      const params = action.params;
      const popupNode = params.popup;
      const key = get(popupNode, ['props', 'name'], 'default'); 
      const node = state.get('node').set(key, true);
      const nodes = state.get('nodes').set(key, popupNode);

      return state.set('node', node).
        //force update
        set('default', !state.get('default')).
        set('nodes', nodes);
  }

  getKey(action)
  {
    const popup = get(action, ['params','popup'], 'default');
    const key = get(popup, ['props', 'name'], popup);
    return key;
  }

  closeAll(state, action)
  {
     return state.set('node', Map());
  }

  closeOne(state, action)
  {
      const key = this.getKey(action);
      const node = state.get('node').delete(key);
      return state.set('node', node);
  }

  cleanAll(state, action)
  {
      return state.set('node', Map())
        .set('nodes', Map());
  }

  cleanOne(state, action)
  {
      const key = this.getKey(action);
      const node = state.get('nodes').delete(key);
      return state.set('nodes', node);
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
