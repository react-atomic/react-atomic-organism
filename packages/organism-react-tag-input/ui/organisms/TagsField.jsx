import { Suggestion } from "react-atomic-organism";
import { Field } from "react-atomic-molecule";
import callfunc from "call-func";

import TagInputUI from "../organisms/TagInputUI";
import TagList from "../organisms/TagList";
import TagInputController from "../organisms/TagInputController";

const TagsField = (props) => {
  const {
    itemsLocator,
    fluid,
    couldCreate,
    createOnBlur,
    onError,
    onController,
    onItemClick,
    name,
    disabled,

    onAdd,
    onAddError,
    onDel,
    tagComponent,
    tagData,
    tagsLocator,
    tagLocator,
    maxTags,
    couldDuplicate,
    ...restProps
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
        tagComponent,
        tagData,
        tagsLocator,
        tagLocator,
        maxTags,
        couldDuplicate,
        disabled,
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
    <Field {...restProps} inputComponent={input} fieldProps={{ onClick }} />
  );
};

export default TagsField;
