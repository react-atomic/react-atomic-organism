'use strict';

import Immutable from 'immutable';
import {ReduceStore} from 'flux/utils';
import dispatcher from '../actions/popupDispatcher';

const PopupState = Immutable.Map();

class PopupStore extends ReduceStore
{

  getInitialState()
  {
      return PopupState;
  }

  updateDom(state, action)
  {
      let params = action.params;
      return state.set('popup', params.popup);
  }

  closeDom(state, action)
  {
      return state.delete('popup');
  }

  reduce (state, action)
  {
      switch (action.type)
      {
          case 'dom/update':
              return this.updateDom(state, action);
          case 'dom/close':
              return this.closeDom(state, action);
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
