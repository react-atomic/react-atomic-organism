import { Suggestion } from "react-atomic-organism";
import { Field } from "react-atomic-molecule";
import callfunc from "call-func";

import TagsInput from "../organisms/TagsInput";
import TagsController from "../organisms/TagsController";

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
    onDel,
    onError,
    onController,
    onItemClick,
    name,
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

  const input = (
    <TagsController {...props} component={TagsInput} ref={handleController} />
  );

  return (
    <Field {...otherProps} inputComponent={input} fieldProps={{ onClick }} />
  );
};

export default TagsField;
