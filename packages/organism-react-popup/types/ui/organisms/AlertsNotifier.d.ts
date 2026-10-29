declare const defaultName = "alerts";
declare function AlertsNotifier(props: any): import("react").ReactElement<unknown, string | import("react").JSXElementConstructor<any>>;
declare namespace AlertsNotifier {
    export { defaultName as displayName };
    export var propTypes: {
        alerts: any;
        onDismiss: any;
    };
}
export default AlertsNotifier;
