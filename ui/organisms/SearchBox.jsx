import React from 'react'; 
import {
    mixClass,
    SemanticUI,
    List
} from 'react-atomic-molecule';

const SearchBox = ({wrapRefCb, wrapStyle, results, itemOnClick, resultsStyle, ...props}) =>
{
    const classes = mixClass (
        props.className,
        'search'
    );
    if (results && results.length) {
        results = (
            <List type="results" style={{...Styles.results, ...resultsStyle}}>
                {results.map( (item, key) =>
                    <SemanticUI
                      className="result"
                      key={key}
                      onClick={e=>{if('function' === typeof itemOnClick){itemOnClick(e, item)}}}
                    >
                      {item}
                    </SemanticUI>
                )}
            </List>
        );
    }
    return (
      <SemanticUI 
        className={classes}
        style={wrapStyle}
        refCb={wrapRefCb}
      >
        <SemanticUI atom="input" className="prompt" type="text" {...props} />
        {results}
      </SemanticUI>
    );
}

export default SearchBox;

const Styles = {
    results: {
        display: 'block',
        maxHeight: '60vh',
        overflowY: 'auto'
    },
}

