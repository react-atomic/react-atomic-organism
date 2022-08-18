import { useEffect, useRef, useImperativeHandle, forwardRef } from "react";
import { build, List } from "react-atomic-molecule";
import { useImmutable, mergeMap } from "reshow-flux";
import callfunc from "call-func";

import TagComponent from "../organisms/Tag";
import getTagData from "../../src/getTagData";
import groupingTags from "../../src/groupingTags";

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
    tags: tagState.get("tags") || [],
    group: tagState.get("group") || {},
  };

  const getTags = () => lastTags.current;

  const expose = {
    getTags,
    add: (tag) => {
      if (disabled) {
        return;
      }
      tag = tag + "";
      const { tags } = getTags();
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
      if (-1 === tags.indexOf(tag) || couldDuplicate) {
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
      if (disabled) {
        return;
      }
      return setTagState((prev) => {
        const tags = prev.get("tags");
        if (couldDuplicate) {
          tags.some((tag, key) => {
            if (tag === delTag) {
              tags.splice(key, 1);
              return true;
            } else {
              return false;
            }
          });
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
      expose.del(tags.pop());
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
  const { expose, handler, tags, group, restProps } = useTags(props);
  const { name, tagComponent = TagComponent } = restProps;
  useImperativeHandle(ref, () => expose, []);
  const buildTag = build(tagComponent);
  return (
    <List style={Styles.list} ui={false} atom="ul" className="horizontal">
      {tags.map((tag) =>
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
