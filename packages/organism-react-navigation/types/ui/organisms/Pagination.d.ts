export default Pagination;
declare function Pagination(pg: any): JSX.Element;
declare namespace Pagination {
    namespace defaultProps {
        const linkComponent: string;
        const forwardText: string;
        const backwardText: string;
    }
}
