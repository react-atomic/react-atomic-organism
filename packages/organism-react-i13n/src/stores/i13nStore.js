'use strict';

require('setimmediate');

import {Map} from 'immutable';
import {ReduceStore} from 'reshow';
import get from 'get-object-value';
import {replaceValue} from 'object-nested';
import {ajaxDispatch} from 'organism-react-ajax';

import dispatcher from '../i13nDispatcher';

const getDefaultActionCallback = (state) => 
    (json, text)=>{
        const element = state.get('element');
        const iframe = get(element,['iframe']);
        if (iframe) {
            iframe.appendHtml(text);
        } 
    };

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
                return getDefaultActionCallback(state);
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

  processAction(state, action)
  {
        const query = get(
            action,
            ['params', 'query'],
            {} 
        );
        query.vpvid = state.get('vpvid');
        if (!action.params) {
            action.params = {};
        }
        action.params.query = query;
        state = this.sendBeacon(state, action); 
        return state;
  }

  processView(state, action)
  {
        state = this.sendBeacon(state, action);
        return state.set('lastUrl', document.URL);
  }

  handleAction(state, action)
  {
        let actionHandler = state.get('actionHandler');
        if (!actionHandler) {
            actionHandler = this.processAction.bind(this);
        }
        const cb = get(action, ['params', 'callback']);
        if (!cb) {
            replaceValue(
                action,
                ['params', 'callback'],
                getDefaultActionCallback(state)
            );
        }
        return actionHandler(state, action);
  }

  handleImpression(state, action)
  {
        let impressionHandler = state.get('impressionHandler');
        if (!impressionHandler) {
            impressionHandler = this.processView.bind(this);
        }
        return impressionHandler(state, action);
  }

  reduce(state, action)
  {
      switch (action.type)
      {
          case 'action':
              return this.handleAction(state, action);
          case 'view':
              return this.handleImpression(state, action);
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
