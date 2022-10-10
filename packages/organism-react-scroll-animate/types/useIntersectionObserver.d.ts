export default useIntersectionObserver;
/**
 * @param {React.ReactElement|string} component
 * @param {IntersectionObserverCallback} onIntersect
 * @param {object} options
 * @returns {React.ReactElement}
 */
declare function useIntersectionObserver(component: React.ReactElement | string, onIntersect: IntersectionObserverCallback, options?: object): React.ReactElement;
