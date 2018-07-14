class NonWorker 
{
    callbacks = []

    constructor()
    {
        let post
        try {
            post = postMessage;
            post({ type: "ready" })
        } catch (e) {
            post = data =>
            {
                const e = { data }
                this.callbacks.forEach( c => c(e) )
            }
        }
        this.post = post
    }

    onMessage = callback =>
    {
        this.onmessage = callback
        if ('undefined' === typeof window) {
            onmessage = callback
        }
        return this
    }

    addEventListener = (type, callback) =>
        this.callbacks.push(callback)

    postMessage = data =>
    {
        const e = { data }
        this.onmessage(e)
    }
}

export default NonWorker  
