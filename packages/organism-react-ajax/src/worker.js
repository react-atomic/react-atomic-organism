require('es6-promise/auto');
import get, {getDefault} from 'get-object-value';

var post;
const callbacks = [];
const keys = Object.keys;
const arrWs = {};

try {
    post = postMessage;
    post({ type: "ready" });
} catch (e) {
    post = (data) =>
    {
        const e = {
            data: data
        };
        callbacks.forEach((c)=>{
            c(e); 
        });
    };
}
export default {
    postMessage: (data) =>
    {
        const e = {
            data: data
        };
        onmessage(e);      
    },
    addEventListener: (type, callback) =>
    {
        callbacks.push(callback);        
    }
};

onmessage = (e) =>
{
    const data = get(e, ['data']);
    switch (data.type) 
    {
        case 'initWs':
            initWs(data.ws);
            break;
        case 'closeWs':
            closeWs(data.ws);
            break;
        case 'ajaxGet':
            ajaxGet(data);
            break;
        case 'ajaxPost':
            ajaxPost(data);
            break;
    }
};

const ajaxGet = ({url, action}) =>
{
    const params = get(action, ['params'], {});
    import('superagent').then( req => {
       req = getDefault(req);
       const headers = {
            ...get(params, ['globalHeaders'], {}),
            ...get(params, ['headers'], {}),
            Accept: get(params, ['accept'], 'application/json')
       };
       req.get(url)
          .query(params.query)
          .set(headers)
          .end((err,res)=>{
            if (res) {
                const {error, req, text, xhr, ...response} = res;
                post({
                    ...action,
                    text,
                    response 
                });
            }
          });
    });
}

const ajaxPost = ({url, action}) =>
{
     const params = get(action, ['params'], {});
     import('superagent').then( req => {
        req = getDefault(req);
        const queryKeys = keys(params.query);
        const headers = {
            ...get(params, ['globalHeaders'], {}),
            ...get(params, ['headers'], {}),
            Accept: get(params, ['accept'], 'application/json')
        };
        let isSend = false;
        if (params.isSendJson) {
            isSend = true;
        } else {
            queryKeys.every( key => {
                 if ('object' !== typeof params.query[key]) {
                    return true;
                 }
                 isSend = true;
                 return false;
            });
        }
        let callReq;
        switch (params.method) {
            case 'delete':
                callReq = req.del(url);
                break;
            case 'head':
                callReq = req.head(url);
                break;
            case 'patch':
                callReq = req.patch(url);
                break;
            case 'put':
                callReq = req.put(url);
                break;
            default:
                callReq = req.post(url);
                break;
        }
        if (!isSend) {
            callReq = callReq.type('form');
        }
        callReq
           .send(params.query)
           .set(headers)
           .end((err,res)=>{
             if (res) {
                 const {error, req, text, xhr, ...response} = res;
                 post({
                     ...action,
                     text,
                     response
                 });                 
             }
           });
     });
}

const closeWs = url =>
{
    arrWs[url].close();
    delete arrWs[url];
}

const initWs = url =>
{
    let ws;
    let isWsConnect;
    const create = url =>
    {
        ws = new WebSocket(url);
        ws.onopen = e => {
            isWsConnect = true;
            arrWs[url] = ws;
        };
        ws.onerror = e => { };
        ws.onmessage = e => {
            switch (e.data) {
                case 'pong': 
                    break;
                default :
                    post({
                        type: 'ws',
                        text: e.data,
                        url
                    });
                    break;
            }
        };
        ws.onclose = e => {
            isWsConnect = false;
        };
    };
    create(url);

    const ping = () =>
    {
        setTimeout(()=>{
            if (!arrWs[url]) {
                return;
            }
            if (!isWsConnect) {
                create(url);
            } else {
                ws.send(JSON.stringify({type:'ping'})); 
            }
            ping();
        },15000);
    };
    ping();
};

