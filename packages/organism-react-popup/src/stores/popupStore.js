'use strict';

import {Map} from 'immutable';
import {ReduceStore} from 'flux/utils';
import dispatcher from '../actions/popupDispatcher';

class PopupStore extends ReduceStore
{

  getInitialState()
  {
      return Map({node:Map()});
  }

  updateDom(state, action)
  {
      const params = action.params;
      const popupNode = params.popup;
      let result;
      result = state.set('popup', popupNode);
      const key = popupNode.props.name;
      if (key) {
        const node = result.get('node').set(key,true);
        result = result.set('node',node);
      } else {
        result = result.set('show', true);
      }
      return result;
  }

  closeAll(state, action)
  {
     const params = action.params;
     let result;
     result = state.set('node', Map());
     result = result.set('show', false);
     return result;
  }

  cleanDom(state, action)
  {
      return state.delete('popup').
        set('node', Map());
  }

  reduce (state, action)
  {
      switch (action.type)
      {
          case 'dom/update':
              return this.updateDom(state, action);
          case 'dom/closeAll':
              return this.closeAll(state, action);
          case 'dom/clean':
              return this.cleanDom(state, action);
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
