'use strict';

import {Map} from 'immutable';
import {ReduceStore} from 'reduce-flux';
import dispatcher from '../actions/navigationDispatcher';
import get from 'get-object-value';

class NavigatioStore extends ReduceStore
{

  getInitialState()
  {
      return Map();
  }

  reduce (state, action)
  {
      let id = get(action,['id'],'default');
      let settings = state.get(id);
      if (!settings) {
        settings = Map();
      }
      settings = settings.merge(action.params);
      return state.set(id, settings);
  }
}

// Export a singleton instance of the store, could do this some other way if
// you want to avoid singletons.
const instance = new NavigatioStore(dispatcher);
export default instance;
