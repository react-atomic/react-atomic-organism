import set from 'set-object-value';

const formSerialize = formEl => {
  const formParams = {};
  const elements = [...formEl.elements];
  elements.forEach(({name, value, type, checked}) => {
    if (name) {
      switch (type.toLowerCase()) {
        case 'checkbox':
          if (checked) {
            set(formParams, [name], value, true);
          }
          break;
        case 'radio':
          if (checked) {
            formParams[name] = value;
          }
          break;
        default: 
          formParams[name] = value;
          break;
      }
    }
  });
  return formParams;
};
export default formSerialize;
