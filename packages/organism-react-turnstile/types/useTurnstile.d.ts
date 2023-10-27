export default useTurnstile;
export type Component = import("reshow-build").Component;
export type TurnstileProps = {
    js?: string | undefined;
    onloadCallbackName?: string | undefined;
    inputWrapperId?: string | undefined;
    sitekey?: string | undefined;
    component?: Component | undefined;
};
/**
 * @param {TurnstileProps} props
 * @returns {[React.ReactElement|null, Function]}
 */
declare function useTurnstile({ js, onloadCallbackName, component, sitekey, }: TurnstileProps): [React.ReactElement | null, Function];
