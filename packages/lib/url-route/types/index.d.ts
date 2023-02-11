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
 * Default "normal" router constructor.
 * accepts path, fn tuples via addRoute
 * returns {fn, params, splats, route} via match
 *
 * @return {Object}
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
     * @returns {RouteProps}
     */
    match(pathname: string, startAt: number): RouteProps;
}
