import get from 'get-object-value';

var ws;
var callbacks = [];
var post;

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
    const {params} = action;
    require(['superagent'],(req)=>{ 
       req.get(url)
          .query(params.query)
          .set('Accept', get(params, ['accept'], 'application/json'))
          .end((err,res)=>{
            post({
                ...action,
                err: err,
                text: res.text,
            });                 
          });
    });
}

const ajaxPost = ({url, action}) =>
{
    const {params} = action;
    require(['superagent'],(req)=>{ 
       req.post(url)
          .send(params.query)
          .set('Accept', get(params, ['accept'], 'application/json'))
          .end((err,res)=>{
            post({
                ...action,
                err: err,
                text: res.text,
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
        post({type: 'ws', text: e.data});
    };
};
