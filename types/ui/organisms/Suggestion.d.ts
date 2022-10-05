export default Suggestion;
declare class Suggestion extends PureComponent<any, any, any> {
    static defaultProps: {
        itemClickToClose: boolean;
        couldCreate: boolean;
        component: {
            ({ inputComponent, className, compHd, compBd, compFt, wrapRefCb, wrapStyle, onWrapClick, results, onItemClick, itemLocator, itemsLocator, inputWrapStyle, resultsStyle, ...restProps }: {
                [x: string]: any;
                inputComponent?: typeof import("react-atomic-molecule/types/ui/molecules/InputBox").default;
                className: any;
                compHd: any;
                compBd: any;
                compFt: any;
                wrapRefCb: any;
                wrapStyle: any;
                onWrapClick: any;
                results: any;
                onItemClick: any;
                itemLocator: any;
                itemsLocator: any;
                inputWrapStyle: any;
                resultsStyle: any;
            }): JSX.Element;
            defaultProps: {
                autoComplete: string;
            };
        };
        itemsLocator: (d: any) => any;
        itemLocator: (d: any) => any;
        itemFilter: (arr: any, currentValue: any, itemLocator: any) => any;
        valueLocator: any;
        filter: boolean;
        preview: boolean;
    };
    static getDerivedStateFromProps(nextProps: any, prevState: any): {
        value: any;
        prevPropsValue: any;
    };
    constructor(props: any);
    constructor(props: any, context: any);
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
    timerClose: number;
    timerSubmit: number;
    timerResetValue: number;
    getValue(): string;
    getSelIndex(): number;
    getIsOpen(): any;
    setValue(value: any, e: any, isOpen: any): void;
    handleChange: (e: any) => void;
    handleSubmit: (e: any) => void;
    handleResetValue: (value: any, e: any) => void;
    originalValue: any;
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
    input: any;
    handleWrapRefCb: (el: any) => void;
    inputWrap: any;
    handlePreview(results: any): any;
    handleFilter(results: any): any;
    handleResults(): any;
    componentDidUpdate(prevProps: any, prevState: any, snapshot: any): void;
    componentWillUnmount(): void;
}
import { PureComponent } from "react";
