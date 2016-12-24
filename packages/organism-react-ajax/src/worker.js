import get from 'get-object-value';

let callbacks = [];

var post;
try {
    post = postMessage;
    post({ type: "ready" });
} catch (e) {
    post = (data) =>
    {
        const d = {
            data: data
        };
        callbacks.forEach((c)=>{
            c(d); 
        });
    };
}


let ws;

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

const ajaxGet = ({url, params, callback, action}) =>
{
    require(['superagent'],(req)=>{ 
       req.get(url)
          .query(params.query)
          .set('Accept', get(params, ['accept'], 'application/json'))
          .end((err,res)=>{
            post({
                params: { 
                    err: err,
                    text: res.text,
                    action: action
                },
                callback: callback
            });                 
          });
    });
}

const ajaxPost = ({url, params, callback, action}) =>
{
    require(['superagent'],(req)=>{ 
       req.post(url)
          .send(params.query)
          .set('Accept', get(params, ['accept'], 'application/json'))
          .end((err,res)=>{
            post({
                params: { 
                    err: err,
                    text: res.text,
                    action: action
                },
                callback: callback
            });                 
          });
    });
}

const initWs = (url) =>
{
    ws = new WebSocket(url);
    ws.onopen = (e) => { };
    ws.onerror = (e) => { };
    ws.onmessage = (e) => {
        post({type: 'ws', data: e.data});
    };
};
export default {
    postMessage: (data) =>
    {
        const d = {
            data: data
        };
        onmessage(d);      
    },
    addEventListener: (type, callback) =>
    {
        callbacks.push(callback);        
    }
};
