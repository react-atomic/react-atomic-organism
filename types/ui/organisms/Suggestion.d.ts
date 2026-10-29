import { PureComponent } from "react";
import SearchBox from "../organisms/SearchBox";
declare const defaultItemFilter: (arr: any, currentValue: any, itemLocator: any) => any;
declare const defaultItemLocator: (d: any) => any;
declare const defaultItemsLocator: (d: any) => any;
declare class Suggestion extends PureComponent {
    timerClose: number;
    timerSubmit: number;
    timerResetValue: number;
    originalValue: any;
    input: any;
    inputWrap: any;
    static defaultProps: {
        itemClickToClose: boolean;
        couldCreate: boolean;
        component: typeof SearchBox;
        itemsLocator: typeof defaultItemsLocator;
        itemLocator: typeof defaultItemLocator;
        itemFilter: typeof defaultItemFilter;
        valueLocator: any;
        filter: boolean;
        preview: boolean;
    };
    state: {
        value: string;
        selIndex: number;
        disabled: boolean;
    };
    results: any[];
    timerCouldCreate: any;
    disabled(bool: any): void;
    open(e: any): void;
    close(): void;
    focus(): void;
    valueLocator: (rawItem: any) => any;
    shouldRenderSuggestions(): any;
    clearTimer(): void;
    getValue(): string;
    getSelIndex(): number;
    getIsOpen(): any;
    setValue(value: any, e: any, isOpen: any): void;
    handleChange: (e: any) => void;
    handleSubmit: (e: any) => void;
    handleResetValue: (value: any, e: any) => void;
    handleClose: (e: any) => void;
    handleCouldCreate: () => {
        value: string;
        originalValue: string;
    };
    handleFocus: (e: any) => void;
    handleBlur: (e: any) => void;
    handleWrapClick: (e: any) => void;
    handleItemClick: (e: {}, item: any) => void;
    handleKeyDown: (e: any) => any;
    handleRefCb: (el: any) => void;
    handleWrapRefCb: (el: any) => void;
    handlePreview(results: any): any;
    handleFilter(results: any): any;
    handleResults(): any;
    static getDerivedStateFromProps(nextProps: any, prevState: any): {
        value: any;
        prevPropsValue: any;
    };
    componentDidUpdate(prevProps: any): void;
    componentWillUnmount(): void;
    render(): import("react").ReactElement<unknown, string | import("react").JSXElementConstructor<any>>;
}
export default Suggestion;
