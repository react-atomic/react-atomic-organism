export default Router;
export type RouteProps = {
    reg: RegExp;
    fn: CallableFunction;
    keys?: string[];
    /**
     * original route string path
     */
    src?: string;
    host?: string;
    query?: string;
    path?: string;
    nextIndex?: number;
    next?: RouteProps;
};
/**
 * const router = new Router();
 * router.addRoute("/xxx*", ()=>{});
 * router.addRoute("/yyy*", ()=>{});
 * let match = router.match("/xxx/foo");
 * if (match) {
 *  match.fn()
 * } else if (match.next) {
 *  match = match.next("/xxx/foo");
 * }
 */
declare class Router {
    /**
     * @type {RouteProps[]}
     */
    routes: RouteProps[];
    addRoute(path?: never, callback?: never): void;
    /**
     * @param {string} pathname
     * @param {number} startAt
     * @returns {RouteProps|undefined}
     */
    match(pathname: string, startAt: number): RouteProps | undefined;
}
