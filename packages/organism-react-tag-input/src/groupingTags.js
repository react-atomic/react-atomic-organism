import { initMap } from "get-object-value";
import { NEW_OBJ } from "reshow-constant";
import dedup from "array.dedup";

const groupingTags = (tags) => {
  const group = NEW_OBJ();
  const initGroup = initMap(group);
  tags.forEach((tag) => {
    initGroup(tag, { data: [], num: 0 });
    group[tag].num++;
  });
  return { tags, uniqueTags: dedup(tags, true), group };
};

export default groupingTags;
