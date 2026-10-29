import React from "react";
declare const SearchBox: ({ autoComplete, inputComponent, className, compHd, compBd, compFt, wrapRefCb, wrapStyle, onWrapClick, results, onItemClick, itemLocator, itemsLocator, inputWrapStyle, resultsStyle, ...restProps }: {
    [x: string]: any;
    autoComplete?: string;
    className: any;
    compBd: any;
    compFt: any;
    compHd: any;
    inputComponent?: (props: {
        className?: string;
        [key: string]: any;
    }) => React.JSX.Element;
    inputWrapStyle: any;
    itemLocator: any;
    itemsLocator: any;
    onItemClick: any;
    onWrapClick: any;
    results: any;
    resultsStyle: any;
    wrapRefCb: any;
    wrapStyle: any;
}) => React.JSX.Element;
export default SearchBox;
