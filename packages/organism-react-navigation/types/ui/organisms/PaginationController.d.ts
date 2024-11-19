export default PaginationController;
declare class PaginationController extends PureComponent<any, any, any> {
    static defaultProps: {
        perPageNum: number;
    };
    constructor(props: any);
    constructor(props: any, context: any);
    getPaginationData(): {
        pageList: {
            navigate: string;
            begin: number | null;
            perPageNum: number;
            end: number | null;
            type: string | null;
            url: string | null;
            currentPage: number;
        }[];
        navigate: {
            currentPage?: {
                navigate: string;
                begin: number | null;
                perPageNum: number;
                end: number | null;
                type: string | null;
                url: string | null;
                currentPage: number;
            } | undefined;
            firstPage?: {
                navigate: string;
                begin: number | null;
                perPageNum: number;
                end: number | null;
                type: string | null;
                url: string | null;
                currentPage: number;
            } | undefined;
            lastPage?: {
                navigate: string;
                begin: number | null;
                perPageNum: number;
                end: number | null;
                type: string | null;
                url: string | null;
                currentPage: number;
            } | undefined;
        };
    };
    cal: paginationCalculator;
    render(): import("react/jsx-runtime").JSX.Element;
}
import { PureComponent } from "react";
import paginationCalculator from "../../paginationCalculator";
