'use strict';

import Immutable from 'immutable';
import {ReduceStore} from 'reduce-flux';
import dispatcher from '../actions/ajaxDispatcher';

const empty = function(){}

class AjaxStore extends ReduceStore
{

  getInitialState()
  {
      return Immutable.Map();
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

  ajaxGet(state, action)
  {
    let self = this;
    let params = action.params;
    if (!params.query) {
        params.query = {};
    }
    let rawUrl = this.getRawUrl(params);
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
    const ajaxUrl = this.cookAjaxUrl(params, rawUrl);
    params.query.r = ((new Date()).getTime());
    require(['superagent'],function(req){ 
       req.get(ajaxUrl)
          .query(params.query)
          .set('Accept', 'application/json')
          .end((res)=>{
                const json = self.getJson(res.text);
                let callback = self.getCallback(state, action, json);
                callback(json, res.text, res);
                if (params.updateUrl) {
                    window.scrollTo(0,0);
                }
           });
    });
    return state;
  }

  ajaxPost(state, action)
  {
    let self = this;
    let params = action.params;
    let rawUrl = this.getRawUrl(params);
    const ajaxUrl = this.cookAjaxUrl(params, rawUrl);
    require(['superagent'],function(req){ 
       req.post(ajaxUrl)
          .send(params.query)
          .withCredentials()
          .set('Accept', 'application/json')
          .end((res)=>{
                const json = self.getJson(res.text);
                let callback = self.getCallback(state, action, json);
                callback(json, res.text);
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
