export default BasePopup;
declare class BasePopup extends PureComponent<any, any, any> {
    static defaultProps: {
        name: string;
    };
    /**
     * @param {any} _error
     */
    static getDerivedStateFromError(_error: any): {
        hasError: boolean;
    };
    /**
     * @param {any} props
     */
    constructor(props: any);
    state: {
        hasError: boolean;
    };
    /**
     * @param {any} error
     * @param {any} info
     */
    componentDidCatch(error: any, info: any): void;
    close(): boolean;
}
import { PureComponent } from "react";
