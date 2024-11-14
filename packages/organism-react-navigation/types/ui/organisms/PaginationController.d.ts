export default PaginationController;
declare class PaginationController extends PureComponent<any, any, any> {
    static defaultProps: {
        perPageNum: number;
    };
    constructor(props: any);
    constructor(props: any, context: any);
    getPaginationData(): {
        currentPageObject: {
            set(key: string, value: any): void;
            "1": number | null;
            type: string | null;
            url: string;
            currentPage: number;
        };
    };
    cal: paginationCalculator;
    render(): import("react/jsx-runtime").JSX.Element;
}
import { PureComponent } from "react";
import paginationCalculator from "../../paginationCalculator";
