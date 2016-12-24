'use strict';

import {Map} from 'immutable';
import {ReduceStore} from 'reduce-flux';
import dispatcher, {ajaxDispatch} from '../actions/ajaxDispatcher';
import get from 'get-object-value';

const empty = function(){}
let wsAuth = Map();
let worker;

const initWorker = (worker) =>
{
    worker.addEventListener('message', (e)=>{
        const data = get(e, ['data']);
        switch (get(e, ['data','type'])) {
            case 'ready':
                break;
            case 'ws':
                ajaxDispatch({
                    type: 'callback',
                    params: {
                        data: e.data.data
                    }
                });
                break;
            default:
                const cbkey = get(e, ['data', 'callback']);
                const params = get(e, ['data', 'params']);
                Callback[cbkey].call(null, params);
                break;
        }
    });
};

const Callback = {
    ajax: ({err, text, action})=>
    {
        ajaxStore.done();
        const json = ajaxStore.getJson(text);
        const callback = ajaxStore.getCallback(ajaxStore.getState(), action, json);
        callback(json, text);
        const params = get(action, ['params']);
        if (params.updateUrl || params.scrollBack) {
            window.scrollTo(0,0);
        }
    }
};

class AjaxStore extends ReduceStore
{

  getInitialState()
  {
    if ('undefined' !== typeof window && window.Worker) {
        require(['worker-loader!../../src/worker'],(workerObject)=>{ 
            worker = workerObject();
            initWorker(worker);
        });
    } else {
        require(['../../src/worker'],(workerObject)=>{ 
            worker = workerObject; 
            initWorker(worker);
        });
    }
      return Map();
  }

  cookAjaxUrl(params, ajaxUrl)
  {
      const urls = ajaxUrl.split('#');
      if (urls[1]) {
        params.query['--hashState'] = urls[1];
      }
      return urls[0];
  }

  getRawUrl = (params)=>
  {
     let url = params.url;
     if (!url) {
         if (params.path) {
             let baseUrl = this.getState().get('baseUrl');
             if (!baseUrl) {
                baseUrl = '';
             }
             url = baseUrl + params.path; 
         } else {
             url = '#';
         }
     }
     return url;
  }

  getCallback(state, action, json)
  {
      let params = action.params;
      let callback;
      if (json.errors) {
          if (params.errorCallback) {
              callback = params.errorCallback;
          }
      } 
      if (json.debugs) {
        let debugs = json.debugs; 
        let bFail = false;
        require(['../lib/dlog'],(dlog)=>{ 
            let c = new dlog({ level: 'trace'});
            debugs.forEach((v)=>{
                c[v[0]](v[1]);
            });
        });
        debugs.forEach((v)=>{
            if ('error' === v[1]) {
                bFail = true;
            }
        });
        if (bFail) {
            return empty;
        }
      }
      if (!callback) {
          if (params.callback) {
            callback = params.callback;
          } else {
            callback = state.get('callback');
          } 
      }
      return callback;
  }

  getJson(text)
  {
      let json;
      try {
          json = JSON.parse(text);
      } catch (e) {
          json = {};
      }
      return json;
  }

  start()
  {
    setTimeout(()=>{
       ajaxDispatch({
        type: 'config/set',
        params: {
            isRunning: 1
        }
       });
    });
  }

  done()
  {
    setTimeout(()=>{
       ajaxDispatch({
        type: 'config/set',
        params: {
            isRunning: 0 
        }
       });
    });
  }

  ajaxGet(state, action)
  {
    const self = this;
    const params = action.params;
    if (!params.query) {
        params.query = {};
    }
    const rawUrl = this.getRawUrl(params);
    if (params.updateUrl) {
        history.pushState('','',rawUrl);
    }
    if (params.disableAjax) {
        const updateWithUrl = state.get('updateWithUrl');
        if (updateWithUrl) {
            updateWithUrl(rawUrl);
        }
        return state;
    }
    self.start();
    const ajaxUrl = this.cookAjaxUrl(params, rawUrl);
    if (!params.disableRandom) {
        params.query.r = ((new Date()).getTime());
    }
    worker.postMessage({
        type: 'ajaxGet',
        url: ajaxUrl,
        params: params,
        callback: 'ajax',
        action: action
    });
    return state;
  }

  ajaxPost(state, action)
  {
    const self = this;
    self.start();
    const params = action.params;
    const rawUrl = this.getRawUrl(params);
    const ajaxUrl = this.cookAjaxUrl(params, rawUrl);
    worker.postMessage({
        type: 'ajaxPost',
        url: ajaxUrl,
        params: params,
        callback: 'ajax',
        action: action
    });
    return state;
  }

  applyCallback(state, action)
  {
    const data = get(action, ['params', 'data']);
    const json = this.getJson(data);
    const callback = this.getCallback(state, action, json);
    switch (get(json,['type'])) {
        case 'auth':
            this.setWsAuth(get(json,['data']));
            break;
        default:
            if (get(json,['data','constructor'])===Object) {
                callback(json.data, data);
            }
            break;
    }
    return state;
  }

  initWs(url)
  {
    worker.postMessage({ws: url, type: 'initWs'});
  }

  setWsAuth(action)
  {
    wsAuth = wsAuth.merge(action); 
  }

  getWsAuth()
  {
    return wsAuth.toJS();
  }

  reduce (state, action)
  {
        switch (action.type)
        {
            case 'ajaxGet':
               return this.ajaxGet(state, action); 
            case 'ajaxPost':
               return this.ajaxPost(state, action); 
            case 'callback':
                return this.applyCallback(state, action); 
            case 'config/set':
               return state.merge(action.params);
            default:
                return state;
        }
  }
}

// Export a singleton instance of the store, could do this some other way if
// you want to avoid singletons.
const ajaxStore = new AjaxStore(dispatcher);
export default ajaxStore;
