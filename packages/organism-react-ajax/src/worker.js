import get from 'get-object-value';

var ws;
var callbacks = [];
var post;
let isWsConnect;
let wsUrl;

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
    System.import('superagent').then((req)=>{
       req.get(url)
          .query(params.query)
          .set('Accept', get(params, ['accept'], 'application/json'))
          .end((err,res)=>{
            if (res) {
                const {error, req, text, xhr, ...resetRes} = res;
                post({
                    ...action,
                    text: text,
                    response: resetRes 
                });
            }
          });
    });
}

const ajaxPost = ({url, action}) =>
{
    const params = get(action, ['params'], {});
    System.import('superagent').then((req)=>{
       req.post(url)
          .field(params.query)
          .set('Accept', get(params, ['accept'], 'application/json'))
          .end((err,res)=>{
            if (res) {
                const {error, req, text, xhr, ...resetRes} = res;
                post({
                    ...action,
                    text: text,
                    response: resetRes 
                });                 
            }
          });
    });
}

const initWs = (url) =>
{
    wsUrl = url;
    ws = new WebSocket(url);
    ws.onopen = (e) => { };
    ws.onerror = (e) => { };
    ws.onmessage = (e) => {
        isWsConnect = true;
        switch (e.data) {
            case 'ping': 
                break;
            default :
                post({type: 'ws', text: e.data});
                break;
        }
    };
    ws.onclose = (e) => {
        isWsConnect = false;
    };
    wsPing();
};

const wsPing = () =>
{
    setTimeout(()=>{
        if (!isWsConnect) {
            initWs(wsUrl);
        } else {
            ws.send(JSON.stringify({type:'ping'})); 
            wsPing();
        }
    },15000);
}


