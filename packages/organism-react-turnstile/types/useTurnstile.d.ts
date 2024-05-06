export default useTurnstile;
export type Component = import("reshow-build").Component;
export type TurnstileProps = {
    js?: string | undefined;
    onloadCallbackName?: string | undefined;
    inputWrapperId?: string | undefined;
    sitekey?: string | undefined;
    errorCallback?: Function | undefined;
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
declare function useTurnstile({ js, onloadCallbackName, component, sitekey, errorCallback, }: TurnstileProps): [React.ReactElement | null, CleanTurnstile];
