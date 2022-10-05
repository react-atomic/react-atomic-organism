export default BasePopup;
declare class BasePopup extends PureComponent<any, any, any> {
    static defaultProps: {
        name: string;
    };
    static getDerivedStateFromError(error: any): {
        hasError: boolean;
    };
    constructor(props: any);
    state: {
        hasError: boolean;
    };
    componentDidCatch(error: any, info: any): void;
    close(): boolean;
}
import { PureComponent } from "react";
