export default Dialog;
declare function Dialog({ name, i18nNegativeBtn, i18nPositiveBtn, size, disableClose, className, buttons, header, children, onClick, ...props }: {
    [x: string]: any;
    name?: string;
    i18nNegativeBtn?: string;
    i18nPositiveBtn?: string;
    size?: string;
    disableClose?: boolean;
    className: any;
    buttons: any;
    header: any;
    children: any;
    onClick: any;
}): JSX.Element;
declare namespace Dialog {
    export { defaultName as displayName };
}
declare const defaultName: "dialog";
