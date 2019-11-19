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
    itemsLocator,
    onDel,
    onItemClick,
    onKeyDown,
    onBlur,
    onFocus,
    onGetSugg,
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
      itemsLocator={itemsLocator}
      onKeyDown={onKeyDown}
      onBlur={onBlur}
      onFocus={onFocus}
    />
  );
};

export default TagInput;

TagInput.defaultProps = {
  tagComponent: Tag
};

const Styles = {
  wrap: {
    borderRadius: '.28571429rem',
    width: '100%',
    cursor: 'text',
  },
  input: {
    border: 'none',
    width: 'auto',
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
  wrap: [{border: '1px solid rgba(34,36,38,.15)'}, '.field.ui .tags-input.ui'],
};
