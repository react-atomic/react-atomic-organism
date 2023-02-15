export default CDN;
declare function CDN(props: any): JSX.Element;
declare namespace CDN {
    namespace defaultProps {
        const cdnHost: string;
        const linkComponent: JSX.Element;
    }
}
