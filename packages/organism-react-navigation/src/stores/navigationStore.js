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
      const id = get(action,['id'],'default');
      const settings = get(state.get(id), null, ()=>Map()).
        merge(action.params)
      return state.set(id, settings);
  }
}

export default new NavigatioStore(dispatcher);
