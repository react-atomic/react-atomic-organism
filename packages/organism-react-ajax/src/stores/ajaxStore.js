'use strict';

import {Map} from 'immutable';
import {ReduceStore} from 'reshow-flux';
import get from 'get-object-value';
import smoothScrollTo from 'smooth-scroll-to';

import dispatcher, {ajaxDispatch} from '../ajaxDispatcher';

const empty = function(){}
const keys  = Object.keys;
let wsAuth = Map();
let gWorker;
let fakeWorker;
let isWorkerReady;
let cbIndex = 0;
const Callbacks = [];

const initWorkerEvent = worker =>
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

const initWorker = props =>
{
    const disableWebWorker = get(
        props,
        ['disableWebWorker']
    );
    let isSupportWorker;
    if ('undefined' !== typeof window) {
        const win = window;
        if (win.Worker && !disableWebWorker) {
            isSupportWorker = true;
            import('worker-loader!../../src/worker').then( workerObject => {
                if (workerObject) {
                    gWorker = new workerObject();
                    initWorkerEvent(gWorker);
                }
            });
        }
    }
    import('../../src/worker').then( ({default: workerObject}) => {
        fakeWorker = workerObject; 
        initWorkerEvent(fakeWorker);
        if (!isSupportWorker) {
            gWorker = fakeWorker;
            isWorkerReady = true;
        }
    });
};

const handleUpdateNewUrl = (state, action, url) =>
{
    setImmediate(()=>{
        const params = get(action, ['params'], {});
        const updateWithUrl = state.get('updateWithUrl');
        updateWithUrl(url);
        if (params.disableAjax && false !== params.scrollBack) {
            smoothScrollTo(0);
        }
    });
}

class AjaxStore extends ReduceStore
{
  cookAjaxUrl(params, ajaxUrl)
  {
      const urls = ajaxUrl.split('#');
      const query = get(params, ['query'], {});
      if (urls[1]) {
        query['--hashState'] = urls[1];
      }

      // <!-- Clean key for fixed superagent error
      if (query) {
          keys(query).forEach((key)=>{
            if ('undefined' === typeof(query[key])) {
                delete query[key];
            }
          });
          params.query = query;
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

  getCallback(state, action, json, response)
  {
      const params = get(action, ['params'], {}); 
      let callback;
      if ( get(json, ['data', 'errors']) || !get(response, ['ok']) ) {
          if (params.errorCallback) {
              callback = Callbacks[params.errorCallback];
              delete(Callbacks[params.errorCallback]);
          }
      }
      if (json.debugs) {
        let debugs = json.debugs; 
        let bFail = false;
        import('../lib/dlog').then((dlog)=>{ 
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
        handleUpdateNewUrl(state, action, rawUrl);
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
    const callback = this.getCallback(state, action, json, response);
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
            const disableWebWorker = get(data, [
                'action',
                'params',
                'disableWebWorker'
            ]);
            const run = disableWebWorker ?
                fakeWorker :
                gWorker;
            run.postMessage(data);
        });
    } else {
        const self = this;
        if (!gWorker) {
            initWorker();
            gWorker = true;
        }
        setTimeout(()=>{
            self.worker(data);
        }, 50);
    }
  }
    initWorker(state, action)
    {
        const disableWebWorker = get(action, [
            'params',
            'disableWebWorker'
        ]);
        initWorker({disableWebWorker});
        gWorker = true;
        return state;
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
        handleUpdateNewUrl(state, action, url);
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
            case 'initWorker':
                return this.initWorker(state, action);
            case 'config/set':
                return state.merge(action.params);
            default:
                return state;
        }
    }
}

export default new AjaxStore(dispatcher);
