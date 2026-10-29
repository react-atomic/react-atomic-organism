import React, { PureComponent } from "react";
import paginationCalculator from "count-pagination";
/**
 * @extends {React.PureComponent}
 */
declare class PaginationController extends PureComponent {
    props: any;
    cal: paginationCalculator;
    static defaultProps: {
        perPageNum: number;
    };
    constructor(/**@type any*/ props: any);
    getPaginationData: () => import("count-pagination").PageListTS;
    render(): React.JSX.Element;
}
export default PaginationController;
