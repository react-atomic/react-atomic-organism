import React from 'react'; 
import {
    mixClass,
    SemanticUI,
    List
} from 'react-atomic-molecule';

const SearchBox = ({results, resultsStyle, ...props}) =>
{
    const classes = mixClass (
        props.className,
        'search'
    );
    if (results) {
        results = (
            <List type="results" style={{...Styles.results, ...resultsStyle}}>
                {results.map( (item, key) =>
                    <SemanticUI className="result" key={key}>{item}</SemanticUI>
                )}
            </List>
        );
    }
    return (
      <SemanticUI {...props}
        className={classes}
      >
        <SemanticUI atom="input" className="prompt" type="text" />
        {results}
      </SemanticUI>
    );
}

export default SearchBox;

const Styles = {
    results: {
        display: 'block'
    }
}
