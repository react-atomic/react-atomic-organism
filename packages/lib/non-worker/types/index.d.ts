export default NonWorker;
declare class NonWorker {
    /**
     * @param {any} callback
     */
    constructor(callback: any);
    /**
     * @type {function[]}
     */
    callbacks: Function[];
    /**
     * Call from inside worker
     * @param {any} data
     */
    post: typeof postMessage;
    onmessage: any;
    /**
     * Register for outside
     * @param {string} _type
     * @param {function} callback
     */
    addEventListener: (_type: string, callback: Function) => number;
    /**
     * Call from outside worker
     * @param {any} data
     */
    postMessage: (data: any) => void;
}
