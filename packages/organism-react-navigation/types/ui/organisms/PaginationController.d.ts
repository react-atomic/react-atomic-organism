export default PaginationController;
/**
 * @extends {React.PureComponent}
 */
declare class PaginationController {
    static defaultProps: {
        perPageNum: number;
    };
    constructor(props: any);
    props: any;
    getPaginationData: () => import("count-pagination").PageListTS;
    cal: paginationCalculator;
    render(): any;
}
import paginationCalculator from "count-pagination";
