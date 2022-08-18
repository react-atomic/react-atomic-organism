import groupingTags from "./groupingTags";

const getTagData = ({
  tags,
  tagData,
  tagsLocator = (d) => d || [],
  tagLocator = (d) => d,
}) => {
  if (null == tags) {
    tags = [];
    const preTags = tagsLocator(tagData);
    if (tagData && (!preTags || !preTags.forEach)) {
      console.error("tagsLocator not return array.");
      return null;
    } else {
      preTags.forEach((t) => tags.push(tagLocator(t)));
    }
  }
  return tags;
};

export default getTagData;
