const extendComponent = (editor, key, extendOptions, newKey) => {
  const DomComponents = editor.DomComponents;
  const origModel = DomComponents.getType(key).model;
  DomComponents.addType(newKey || key, {
    model: origModel.extend({
      defaults: {
        ...origModel.prototype.defaults,
        ...extendOptions,
      },
    }),
  });
};

export default extendComponent;
