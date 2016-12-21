import get from 'get-object-value';

postMessage({ type: "ready" });
let ws;

onmessage = (e) =>
{
    switch (get(e, ['data','type'])) 
    {
        case 'initWs':
            initWs(get(e,['data','ws']));
            break;
    }
};

const initWs = (url) =>
{
    ws = new WebSocket(url);
    ws.onopen = (e) => { };
    ws.onerror = (e) => { };
    ws.onmessage = (e) => {
        postMessage({type: 'ws', data: e.data});
    };
};

