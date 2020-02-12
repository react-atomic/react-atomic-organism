import React, {PureComponent} from 'react';
import {Suggestion} from 'react-atomic-organism';
import {build, lazyInject, mixClass, List, Field} from 'react-atomic-molecule';
import Tag from '../organisms/Tag';

const TagInput = props => {
  injects = lazyInject(injects, InjectStyles);
  const {
    fluid,
    tags,
    tagComponent,
    groupTags,
    name,
    itemFilter,
    itemLocator,
    itemsLocator,
    onDel,
    onItemClick,
    onKeyDown,
    onBlur,
    onFocus,
    onGetSugg,
    results,
  } = props;
  let thisTags = null;
  if (tags.length) {
    const buildTag = build(tagComponent);
    thisTags = (
      <List style={Styles.list} ui={false} atom="ul" className="horizontal">
        {groupTags.tags.map(tag =>
          buildTag(
            {
              onDel: onDel(tag),
              group: groupTags.group[tag],
              key: tag,
              tag,
            },
            <input type="hidden" name={name} value={tag} />,
          ),
        )}
      </List>
    );
  }
  const classes = mixClass('tags-input', {
    fluid,
  });
  return (
    <Suggestion
      filter
      compHd={thisTags}
      ref={onGetSugg}
      className={classes}
      style={Styles.input}
      wrapStyle={Styles.wrap}
      onItemClick={onItemClick}
      itemFilter={itemFilter}
      itemLocator={itemLocator}
      itemsLocator={itemsLocator}
      results={results}
      onSubmit={false}
      onKeyDown={onKeyDown}
      onBlur={onBlur}
      onFocus={onFocus}
    />
  );
};

export default TagInput;

TagInput.defaultProps = {
  tagComponent: Tag,
};

const Styles = {
  wrap: {
    border: '1px solid rgba(34,36,38,.15)',
    borderRadius: '.28571429rem',
    padding: '1px 0',
    width: '100%',
    cursor: 'text',
    position: 'relative',
    boxSizing: 'border-box',
  },
  input: {
    border: 'none',
    width: 'auto',
    maxWidth: '100%',
    maxHeight: '100%',
    margin: 0,
  },
  list: {
    padding: 0,
    margin: 0,
    display: 'inline',
    pointerEvents: 'all',
  },
};

let injects;
const InjectStyles = {
  error: [
    {background: '#fff6f6', borderColor: '#e0b4b4'},
    '.field.error.ui .tags-field.ui',
  ],
};
