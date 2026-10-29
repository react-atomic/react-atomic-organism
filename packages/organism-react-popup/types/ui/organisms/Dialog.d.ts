import * as React from "react";
declare const defaultName = "dialog";
export type DialogExtraEvent = {
    button: any;
};
export type DialogEvent = DialogExtraEvent & React.MouseEvent;
declare function Dialog({ name, i18nNegativeBtn, i18nPositiveBtn, size, disableClose, className, buttons, header, children, onClick, ...props }: any): React.JSX.Element;
declare namespace Dialog {
    export { defaultName as displayName };
}
export default Dialog;
