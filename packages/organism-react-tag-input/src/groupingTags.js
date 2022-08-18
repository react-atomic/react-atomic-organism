import { initMap } from "get-object-value";
import { NEW_OBJ } from "reshow-constant";

const dedupTags = (tags, group) => {
  const nextTags = [];
  const tMap = NEW_OBJ();
  tags.forEach((t) => {
    if (!tMap[t] && group[t].num !== 0) {
      nextTags.push(t + "");
      tMap[t] = 1;
    }
  });
  return nextTags;
};

const groupingTags = (tags) => {
  const group = NEW_OBJ();
  const initGroup = initMap(group);
  tags.forEach((tag) => {
    initGroup(tag, { data: [], num: 0 });
    group[tag].num++;
  });
  return { tags: dedupTags(tags, group), group };
};

export default groupingTags;
