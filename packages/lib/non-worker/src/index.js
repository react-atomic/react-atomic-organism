import "array.polyfill";
class NonWorker {
  callbacks = [];

  constructor() {
    this.post = (data) => {
      const e = { data };
      this.callbacks.forEach((c) => c(e));
    };

    if ("undefined" === typeof window) {
      try {
        const post = postMessage;
        post({ type: "ready" });
        this.post = post;
      } catch (e) {
        console.error(e);
      }
    }
  }

  onMessage = (callback) => {
    this.onmessage = callback;
    if ("undefined" === typeof window) {
      onmessage = callback;
    }
    return this;
  };

  addEventListener = (type, callback) => this.callbacks.push(callback);

  postMessage = (data) => {
    const e = { data };
    this.onmessage(e);
  };
}

export default NonWorker;
