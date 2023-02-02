import { useEffect, useRef, useImperativeHandle, forwardRef } from "react";
import { build, List } from "react-atomic-molecule";
import { useImmutable, mergeMap } from "reshow-flux";
import callfunc from "call-func";

import TagComponent from "../organisms/Tag";
import getTagData from "../../getTagData";
import groupingTags from "../../groupingTags";

const ERROR_EXCEED_MAX_TAGS = 1;
const ERROR_DUPLICATE_TAG = 2;
const I18N_EXCEED_MAX_TAGS = "exceed max tags.";
const I18N_DUPLICATE_TAG = "can't add duplicate tag.";

const useTags = ({
  maxTags = -1,
  onAdd,
  onAddError,
  onDel,
  couldDuplicate,
  disabled,
  tags,
  tagData,
  tagsLocator,
  tagLocator,
  ...restProps
}) => {
  const [tagState, setTagState] = useImmutable(() => {
    return groupingTags(
      getTagData({
        tags,
        tagData,
        tagsLocator,
        tagLocator,
      })
    );
  });

  const lastTags = useRef();
  lastTags.current = {
    uniqueTags: tagState.get("uniqueTags") || [],
    tags: tagState.get("tags") || [],
    group: tagState.get("group") || {},
    maxTags,
  };
  const lastOpt = useRef();
  lastOpt.current = {
    couldDuplicate,
    disabled,
  };

  const getTags = () => lastTags.current;

  const expose = {
    getTags,
    add: (tag) => {
      if (lastOpt.current.disabled) {
        return;
      }
      tag = tag + "";
      const { tags, maxTags } = getTags();
      if (-1 !== maxTags && tags && tags.length >= maxTags) {
        return callfunc(onAddError, [
          {
            code: ERROR_EXCEED_MAX_TAGS,
            message: I18N_EXCEED_MAX_TAGS,
            last: tag,
            tags,
          },
        ]);
      }
      if (-1 === tags.indexOf(tag) || lastOpt.current.couldDuplicate) {
        return setTagState((prev) => {
          const tags = prev.get("tags");
          tags.push(tag);
          return {
            ...groupingTags(tags),
            action: "add",
            last: tag,
          };
        });
      } else {
        return callfunc(onAddError, [
          {
            code: ERROR_DUPLICATE_TAG,
            message: I18N_DUPLICATE_TAG,
            last: tag,
            tags,
          },
        ]);
      }
    },
    del: (delTag) => {
      if (lastOpt.current.disabled) {
        return;
      }
      return setTagState((prev) => {
        const tags = prev.get("tags");
        if (lastOpt.current.couldDuplicate) {
          let tLen = tags.length;
          while (tLen--) {
            if (tags[tLen] === delTag) {
              tags.splice(tLen, 1);
              break;
            }
          }
        } else {
          tags.forEach((tag, key) => {
            if (tag === delTag) {
              tags.splice(key, 1);
            }
          });
        }
        return {
          ...groupingTags(tags),
          action: "del",
          last: delTag,
        };
      });
    },
    delLast: () => {
      const { tags } = getTags();
      expose.del(tags[tags.length - 1]);
    },
  };

  useEffect(() => {
    const last = tagState.get("last");
    const tags = tagState.get("tags");
    switch (tagState.get("action")) {
      case "add":
        callfunc(onAdd, [{ last, tags }]);
        break;
      case "del":
        callfunc(onDel, [{ last, tags }]);
        break;
    }
  }, [tagState]);

  const handler = {
    del: (tag) => () => expose.del(tag),
  };

  return {
    ...getTags(),
    expose,
    handler,
    restProps,
  };
};

const TagList = forwardRef((props, ref) => {
  const { expose, handler, uniqueTags, group, restProps } = useTags(props);

  const { name, tagComponent = TagComponent } = restProps;
  useImperativeHandle(ref, () => expose, []);
  const buildTag = build(tagComponent);
  return (
    <List style={Styles.list} ui={false} atom="ul" className="horizontal">
      {uniqueTags.map((tag, key) =>
        buildTag(
          {
            onDel: handler.del(tag),
            group: group[tag],
            key: tag,
            tag,
          },
          <input type="hidden" name={name} value={tag} />
        )
      )}
    </List>
  );
});

TagList.displayName = "TagList";

export default TagList;

export { ERROR_EXCEED_MAX_TAGS, ERROR_DUPLICATE_TAG };

const Styles = {
  list: {
    padding: 0,
    margin: 0,
    display: "inline",
    pointerEvents: "all",
  },
};
