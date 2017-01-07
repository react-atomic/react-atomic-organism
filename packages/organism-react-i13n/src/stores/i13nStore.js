'use strict';

import {Map} from 'immutable';
import {ReduceStore} from 'reduce-flux';
import get from 'get-object-value';

import dispatcher from '../actions/i13nDispatcher';

class I13nStore extends ReduceStore
{

  getInitialState()
  {
      return Map();
  }

  reduce (state, action)
  {
      switch (action.type)
      {
          case 'config/set':
              return state.merge(action.params);
          default:
              return state;
      }
  }
}

// Export a singleton instance of the store, could do this some other way if
// you want to avoid singletons.
const instance = new I13nStore(dispatcher);
export default instance;
