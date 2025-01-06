export default FormattedJSON;
declare class FormattedJSON {
    render(): any;
    formatJSON(input: any, space: any): string;
}
declare namespace FormattedJSON {
    namespace defaultProps {
        let atom: string;
    }
}
