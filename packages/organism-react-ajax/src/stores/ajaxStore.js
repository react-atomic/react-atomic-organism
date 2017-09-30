'use strict';

import {Map} from 'immutable';
import {ReduceStore} from 'reshow-flux';
import get from 'get-object-value';
import smoothScrollTo from 'smooth-scroll-to';

import dispatcher, {ajaxDispatch} from '../ajaxDispatcher';

const empty = function(){}
const keys  = Object.keys;
let wsAuth = Map();
let worker;
let isWorkerReady;
let cbIndex = 0;
let Callbacks = [];

const initWorker = (worker) =>
{
    worker.addEventListener('message', (e)=>{
        switch (get(e, ['data','type'])) {
            case 'ready':
                isWorkerReady = true;
                break;
            default:
                ajaxDispatch({
                    ...e.data,
                    type: 'callback',
                });
                break;
        }
    });
};

class AjaxStore extends ReduceStore
{

  getInitialState()
  {
    if ('undefined' !== typeof window) {
        if (window.Worker) {
            require(['worker-loader!../../src/worker'],(workerObject)=>{ 
                worker = workerObject();
                initWorker(worker);
            });
        } else {
            require(['../../src/worker'],(workerObject)=>{ 
                worker = workerObject; 
                initWorker(worker);
                isWorkerReady = true;
            });
        }
    }
    return Map();
  }

  cookAjaxUrl(params, ajaxUrl)
  {
      const urls = ajaxUrl.split('#');
      const query = params.query;
      if (urls[1]) {
        query['--hashState'] = urls[1];
      }

      // <!-- Clean key for fixed superagent error
      if (query) {
          const queryKeys = keys(query);
          queryKeys.forEach((key)=>{
            if ('undefined' === typeof(query[key])) {
                delete query[key];
            }
          });
      }
      // -->

      return urls[0];
  }

  getRawUrl = (params)=>
  {
     let {url, path} = params;
     if (!url) {
         if (path) {
             let baseUrl = this.getState().get('baseUrl');
             if (!baseUrl) {
                baseUrl = '';
             }
             url = baseUrl + path; 
         } else {
             url = '#';
         }
     }
     return url;
  }

  getCallback(state, action, json)
  {
      const params = get(action, ['params'], {}); 
      let callback;
      if (get(json, ['data', 'errors'])) {
          if (params.errorCallback) {
              callback = Callbacks[params.errorCallback];
              delete(Callbacks[params.errorCallback]);
          }
      }
      if (json.debugs) {
        let debugs = json.debugs; 
        let bFail = false;
        System.import('../lib/dlog').then((dlog)=>{ 
            const oLog = new dlog({ level: 'trace'});
            debugs.forEach((v)=>{
                const dump = get(oLog, [v[0]], ()=>oLog.info); 
                dump.call(oLog, v[1]);
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
            callback = Callbacks[params.callback];
            delete(Callbacks[params.callback]);
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
    setImmediate(()=>{
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
    setImmediate(()=>{
       ajaxDispatch({
        type: 'config/set',
        params: {
            isRunning: 0 
        }
       });
    });
  }

  storeCallback(action)
  {
    const cb = get(action,['params','callback']);
    if (cb) {
        const cbKey = 'cb'+cbIndex;
        Callbacks[cbKey] = cb;
        action.params.callback = cbKey;
        cbIndex++;
    }
    const err = get(action,['params','errorCallback']);
    if (err) {
        const errCbKey = 'err'+cbIndex;
        Callbacks[errCbKey] = err;
        action.params.errorCallback = errCbKey;
        cbIndex++;
    }
    return action;
  }

  ajaxGet(state, action)
  {
    const self = this;
    const params = action.params;
    const rawUrl = self.getRawUrl(params);
    if (params.updateUrl && rawUrl !== document.URL) {
        history.pushState('', '', rawUrl);
    }
    if (params.disableAjax) {
        this.handleUpdateNewUrl(state, rawUrl);
        return state;
    }
    if (!params.disableProgress) {
        self.start();
    }
    setImmediate(()=>{
        const ajaxUrl = self.cookAjaxUrl(params, rawUrl);
        if (!params.query) {
            params.query = {};
        }
        if (!params.disableRandom) {
            params.query['--r'] = ((new Date()).getTime())+''+Math.random();
        } else {
            params.query['--r'] = state.get('staticVersion');
        }
        self.worker({
            type: 'ajaxGet',
            url: ajaxUrl,
            action: self.storeCallback(action)
        });
    });
    return state;
  }

  ajaxPost(state, action)
  {
    const self = this;
    const params = action.params;
    if (!params.disableProgress) {
        self.start();
    }
    const rawUrl = self.getRawUrl(params);
    const ajaxUrl = self.cookAjaxUrl(params, rawUrl);
    self.worker({
        type: 'ajaxPost',
        url: ajaxUrl,
        action: self.storeCallback(action)
    });
    return state;
  }

  applyCallback(state, action)
  {
    const params = get(action, ['params'], {}); 
    if (!params.disableProgress) {
        this.done();
    }
    const text = get(action, ['text']);
    const response = get(action, ['response']); 
    const json = this.getJson(text);
    const callback = this.getCallback(state, action, json);
    const type = get(json,['type']);
    switch (type) {
        case 'ws-auth':
            this.setWsAuth(get(json,['--realTimeData--']));
            break;
        default:
            setImmediate(()=>{
                callback(json, text, response);
            });
            break;
    }
    if ((params.updateUrl && false !== params.scrollBack) || params.scrollBack) {
        smoothScrollTo(0);
    }
    return state;
  }

  worker(data)
  {
    if (isWorkerReady) {
        setImmediate(()=>{
            worker.postMessage(data);
        });
    } else {
        const self = this;
        setTimeout(()=>{
            self.worker(data);
        }, 50);
    }
  }

    initWs(url)
    {
        this.worker({ws: url, type: 'initWs'});
    }

    setWsAuth(data)
    {
        wsAuth = wsAuth.merge(data);
    }

    getWsAuth()
    {
        return wsAuth.toJS();
    }

    updateWithUrl(state, action)
    {
        const url = get(
            action, 
            [
                'params',
                'url'
            ],
            document.URL
        );
        this.handleUpdateNewUrl(state, url);
        /**
         * Should not update currentLocation in other place.
         * such as ajaxGet,
         * Because this state should only trigger when bfchange happened.
         */
        return state.set(
            'currentLocation',
            url 
        );
    }

    handleUpdateNewUrl(state, url)
    {
        setImmediate(()=>{
            const updateWithUrl = state.get('updateWithUrl');
            updateWithUrl(url);
        });
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
            case 'updateWithUrl':
                return this.updateWithUrl(state, action);
            case 'config/set':
                return state.merge(action.params);
            default:
                return state;
        }
    }
}

export default new AjaxStore(dispatcher);
