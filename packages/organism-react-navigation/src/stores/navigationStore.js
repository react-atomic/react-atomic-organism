'use strict';

import {Map} from 'immutable';
import {ReduceStore} from 'reshow-flux';
import dispatcher from '../navigationDispatcher';
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

export default new NavigatioStore(dispatcher);
