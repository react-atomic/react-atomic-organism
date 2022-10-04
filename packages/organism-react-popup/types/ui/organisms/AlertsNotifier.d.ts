export default AlertsNotifier;
declare function AlertsNotifier(props: any): any;
declare namespace AlertsNotifier {
    export { defaultName as displayName };
    export namespace propTypes {
        const alerts: any;
        const onDismiss: any;
    }
}
declare const defaultName: "alerts";
