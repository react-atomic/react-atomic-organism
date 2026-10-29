declare class List {
    _sentinel: {
        _next: /*elided*/ any;
        _prev: /*elided*/ any;
    };
    constructor();
    dequeue(): {
        _next: /*elided*/ any;
        _prev: /*elided*/ any;
    };
    enqueue(entry: any): void;
    toString(): string;
}
export default List;
