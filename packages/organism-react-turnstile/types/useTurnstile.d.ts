export default useTurnstile;
export type Component = import("reshow-build").Component;
export type TurnstileProps = {
    js?: string | undefined;
    onloadCallbackName?: string | undefined;
    inputWrapperId?: string | undefined;
    sitekey?: string | undefined;
    errorCallback?: Function | undefined;
    callback?: Function | undefined;
    callbackTimeout?: number | undefined;
    component?: Component | undefined;
};
export type CleanTurnstile = (bRemove?: boolean) => any;
/**
 * @callback CleanTurnstile
 * @param {boolean} [bRemove]
 */
/**
 * @param {TurnstileProps} props
 * @returns {[React.ReactElement|null, CleanTurnstile]}
 */
declare function useTurnstile({ js, onloadCallbackName, component, sitekey, errorCallback, callback, callbackTimeout, }: TurnstileProps): [React.ReactElement | null, CleanTurnstile];
