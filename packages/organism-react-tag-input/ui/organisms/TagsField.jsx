import { Suggestion } from "react-atomic-organism";
import { Field } from "react-atomic-molecule";
import callfunc from "call-func";

import TagInputUI from "../organisms/TagInputUI";
import TagList from "../organisms/TagList";
import TagInputController from "../organisms/TagInputController";

const TagsField = (props) => {
  const {
    itemsLocator,
    tagData,
    tagsLocator,
    tagLocator,
    tagComponent,
    fluid,
    couldCreate,
    couldDuplicate,
    createOnBlur,
    maxTags,
    onAdd,
    onAddError,
    onDel,
    onError,
    onController,
    onItemClick,
    name,
    disabled,
    ...otherProps
  } = props;

  let controller;
  const onClick = (e) => {
    controller.handleClick(e);
  };
  const handleController = (el) => {
    controller = el;
    callfunc(onController, [el]);
  };

  const tagList = (
    <TagList
      {...{
        onAdd,
        onAddError,
        onDel,
        couldDuplicate,
        disabled,
        tagComponent,
        tagData,
        tagsLocator,
        tagLocator,
        maxTags,
      }}
    />
  );

  const input = (
    <TagInputController
      {...props}
      component={TagInputUI}
      tagList={tagList}
      ref={handleController}
    />
  );

  return (
    <Field {...otherProps} inputComponent={input} fieldProps={{ onClick }} />
  );
};

export default TagsField;
