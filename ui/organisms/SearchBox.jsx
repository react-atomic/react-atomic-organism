import React, {isValidElement, cloneElement} from 'react';
import {mixClass, SemanticUI, List} from 'react-atomic-molecule';

const SearchBox = ({
  wrapRefCb,
  wrapStyle,
  results,
  itemOnClick,
  resultsStyle,
  ...props
}) => {
  const classes = mixClass(props.className, 'search');
  if (results && results.length) {
    results = (
      <List type="results" style={{...Styles.results, ...resultsStyle}}>
        {results.map((item, key) => {
          const itemNextProps = {};
          if ('function' === typeof itemOnClick) {
            itemNextProps.onClick = e => itemOnClick(e, item);
          }
          if (isValidElement(item)) {
            itemNextProps.className = mixClass(item.props.className, 'result');
            return cloneElement(
              item,
              itemNextProps
            );
          } else {
            return (
              <SemanticUI
                className="result"
                key={key}
                {...itemNextProps}
              >
                {item}
              </SemanticUI>
            );
          }
        })}
      </List>
    );
  }
  return (
    <SemanticUI className={classes} style={wrapStyle} refCb={wrapRefCb}>
      <SemanticUI atom="input" className="prompt" type="text" {...props} />
      {results}
    </SemanticUI>
  );
};

export default SearchBox;

const Styles = {
  results: {
    display: 'block',
    maxHeight: '60vh',
    overflowY: 'auto',
  },
};
