'use strict';

import Immutable from 'immutable';
import {ReduceStore} from 'flux/utils';
import path from 'path';
import dispatcher from '../actions/ajaxDispatcher';

const AjaxState = Immutable.Map();

const empty = function(){}

class AjaxStore extends ReduceStore
{

  getInitialState()
  {
      return AjaxState;
  }

  baseName(s)
  {
    return path.basename(s);
  }

  cookAjaxUrl(state, ajaxUrl)
  {
    let json = state.get('jsonBaseName');
    if (json) {
        if ('/'!==ajaxUrl.substr(-1)) {
            const index = baseName(ajaxUrl);
            ajaxUrl = ajaxUrl.replace(index,json);
        } else {
            ajaxUrl += json;
        }
    }
    return ajaxUrl;
  }

  getRawUrl(state, params){
     let url = params.url;
     let baseUrl = state.get('baseUrl');
     if (!baseUrl) {
        baseUrl = '';
     }
     if (!url) {
        url = baseUrl + params.path; 
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
        require(['../lib/dlog'],function(dlog){ 
            let c = new dlog({ level: 'trace'});
            debugs.forEach(function(v){
                c[v[0]](v[1]);
            });
        });
        debugs.forEach(function(v){
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

  ajaxGet(state, action)
  {
    let self = this;
    let params = action.params;
    if (!params.query) {
        params.query = {};
    }
    let rawUrl = this.getRawUrl(state, params);
    if (params.updateUrl) {
        history.pushState('','',rawUrl);
    }
    if (!state.get('ajax')) {
        const updateWithUrl = state.get('updateWithUrl');
        if (updateWithUrl) {
            updateWithUrl(rawUrl);
        }
        return state;
    }
    const ajaxUrl = this.cookAjaxUrl(state, rawUrl);
    params.query.r = ((new Date()).getTime());
    require(['superagent'],function(req){ 
       req.get(ajaxUrl)
          .withCredentials()
          .query(params.query)
          .set('Accept', 'application/json')
          .end(function(res){
                let json = JSON.parse(res.text);
                let callback = self.getCallback(state, action, json);
                callback(json);
                window.scrollTo(0,0);
           });
    });
    return state;
  }

  ajaxPost(state, action)
  {
    let self = this;
    let params = action.params;
    let rawUrl = this.getRawUrl(state, params);
    const ajaxUrl = this.cookAjaxUrl(state, rawUrl);
    require(['superagent'],function(req){ 
       req.post(ajaxUrl)
          .send(params.query)
          .withCredentials()
          .set('Accept', 'application/json')
          .end((res)=>{
                let json = JSON.parse(res.text);
                let callback = self.getCallback(state, action, json);
                callback(json);
           });
    });
    return state;
  }

  reduce (state, action)
  {
        switch (action.type)
        {
            case 'ajaxGet':
               return this.ajaxGet(state, action); 
            case 'ajaxPost':
               return this.ajaxPost(state, action); 
            case 'config/set':
               return state.merge(action.params);
            default:
                return state;
        }
  }
}

// Export a singleton instance of the store, could do this some other way if
// you want to avoid singletons.
const instance = new AjaxStore(dispatcher);
export default instance;
