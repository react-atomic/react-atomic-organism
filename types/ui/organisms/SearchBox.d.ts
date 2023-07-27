export default SearchBox;
declare function SearchBox({ inputComponent, className, compHd, compBd, compFt, wrapRefCb, wrapStyle, onWrapClick, results, onItemClick, itemLocator, itemsLocator, inputWrapStyle, resultsStyle, ...restProps }: {
    [x: string]: any;
    inputComponent?: typeof InputBox;
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
}): import("react/jsx-runtime").JSX.Element;
declare namespace SearchBox {
    namespace defaultProps {
        const autoComplete: string;
    }
}
import { InputBox } from "react-atomic-molecule";
