const callbacks = []

const input = {
    postMessage: data =>
    {
        const e = {
            data: data
        }
        onmessage(e)
    },
    addEventListener:
        (type, callback) => callbacks.push(callback)
}

try {
    post = postMessage;
    post({ type: "ready" })
} catch (e) {
    post = data =>
    {
        const e = {
            data: data
        }
        callbacks.forEach( c => c(e) )
    }
}

export {input, post}
