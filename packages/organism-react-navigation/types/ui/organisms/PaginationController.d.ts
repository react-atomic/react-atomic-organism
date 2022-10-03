export default PaginationController;
declare class PaginationController extends PureComponent<any, any, any> {
    static defaultProps: {
        perPageNum: number;
    };
    constructor(props: any);
    constructor(props: any, context: any);
    getPaginationData(): {
        currentPage: any;
    };
    cal: paginationCalculator;
    render(): JSX.Element;
}
import { PureComponent } from "react";
import paginationCalculator from "../../paginationCalculator";
