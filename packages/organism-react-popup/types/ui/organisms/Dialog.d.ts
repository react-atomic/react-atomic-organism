export default Dialog;
export type DialogExtraEvent = {
    button: any;
};
export type DialogEvent = DialogExtraEvent & React.MouseEvent;
/**
 * @typedef {object} DialogExtraEvent
 * @property {any} button
 */
/**
 * @typedef {DialogExtraEvent & React.MouseEvent} DialogEvent
 */
/**
 * @param {any} props
 */
declare function Dialog({ name, i18nNegativeBtn, i18nPositiveBtn, size, disableClose, className, buttons, header, children, onClick, ...props }: any): import("react/jsx-runtime").JSX.Element;
declare namespace Dialog {
    export { defaultName as displayName };
}
import * as React from "react";
declare const defaultName: "dialog";
