export default ConstraintForm;
export type Component = import("reshow-build").Component;
export type RefType = import("reshow-build").RefType;
export type ValidityElement = Element & object;
export type FormElement = Element & object;
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
export type ConstraintFormProps = {
    className?: string | undefined;
    builtInOnly?: boolean | undefined;
    component?: Component | undefined;
    onSubmit?: Function | undefined;
    refCb?: RefType | undefined;
};
export const ConstraintField: import("react").ForwardRefExoticComponent<import("react").RefAttributes<any>>;
declare const ConstraintForm: import("react").ForwardRefExoticComponent<import("react").RefAttributes<any>>;
