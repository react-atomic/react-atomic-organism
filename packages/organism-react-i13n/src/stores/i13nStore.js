'use strict';

require('setimmediate');

import {Map} from 'immutable';
import {ReduceStore} from 'reduce-flux';
import get from 'get-object-value';
import {ajaxDispatch} from 'organism-react-ajax';

import dispatcher from '../actions/i13nDispatcher';

class I13nStore extends ReduceStore
{

  getInitialState()
  {
      return Map();
  }

  sendBeacon(state, action)
  {
        const pvid = state.get('pvid');
        const src = state.get('src');
        const params = action.params;
        const query = get(params, ['query'], []);
        const callback = get(
            params,
            ['callback'],
            () => {
                // default cb for action
                return (json, text)=>{
                    const element = state.get('element');
                    const iframe = get(element,['iframe']);
                    if (iframe) {
                        iframe.appendHtml(text);
                    } 
                };
            }
        );
        setImmediate(()=>{
            ajaxDispatch({
                type: 'ajaxPost',
                params: {
                   url: src+action.type,
                   query: {
                       pvid: pvid,
                       url: document.URL,
                       params: get(params, ['I13N']),
                       ...query
                   },
                   callback: callback,
                   disableProgress: true 
                }
            });
        });
        return state;
  }

  processView(state, action)
  {
        state = this.sendBeacon(state, action); 
        return state.set('lastUrl', document.URL);        
  }

  reduce (state, action)
  {
      switch (action.type)
      {
          case 'action':
              return this.sendBeacon(state, action); 
          case 'view':
              return this.processView(state, action); 
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
