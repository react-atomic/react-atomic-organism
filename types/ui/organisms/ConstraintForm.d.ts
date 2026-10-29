export type Component = import("reshow-build").Component;
export type RefType = import("reshow-build").RefType;
export type ValidityElement = Element & {
    checkValidity: () => boolean;
    reportValidity: () => boolean;
    validity: ValidityState;
};
export type FormElement = Element & {
    form: HTMLFormElement;
    setCustomValidity: (message: string) => void;
    reportValidity: () => boolean;
};
export type ConstraintFieldProps = {
    builtInOnly?: boolean | undefined;
    compRef?: RefType | undefined;
    onDisplayError?: Function | undefined;
    hideMessageComponent?: boolean | undefined;
    onValidate?: Function | undefined;
    onError?: Function | undefined;
    ref?: RefType | undefined;
    refCb?: RefType | undefined;
    component?: Component | undefined;
};
declare const ConstraintField: import("react").ForwardRefExoticComponent<import("react").RefAttributes<any>>;
export type ConstraintFormProps = {
    className?: string | undefined;
    builtInOnly?: boolean | undefined;
    component?: Component | undefined;
    onSubmit?: Function | undefined;
    refCb?: RefType | undefined;
};
declare const ConstraintForm: import("react").ForwardRefExoticComponent<import("react").RefAttributes<any>>;
export { ConstraintField };
export default ConstraintForm;
