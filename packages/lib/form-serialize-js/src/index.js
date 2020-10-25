import set from "set-object-value";

const maybeArray = (formParams, { name, value, arrayMode }) => {
  switch (arrayMode) {
    case "arrayKeyKeep":
    case "arrayKey":
      const len = name.length;
      if ("[]" === name.substring(len - 2, len)) {
        const thisName =
          arrayMode === "arrayKeyKeep" ? name : name.substring(0, len - 2);
        set(formParams, [thisName], value, true);
      } else {
        formParams[name] = value;
      }
      break;
    case "auto":
      if (formParams[name]) {
        set(formParams, [name], value, true);
      } else {
        formParams[name] = value;
      }
      break;
    default:
      formParams[name] = value;
      break;
  }
};

const formSerialize = (formEl, arrayMode) => {
  arrayMode = null != arrayMode ? arrayMode : "auto";
  const formParams = {};
  const elements = [...formEl.elements];
  elements.forEach((el) => {
    const { name, value, type, checked } = el;
    const booleanValue = el.getAttribute("data-boolean")
      ? !!(-1 !== "|0|null|true|false|".indexOf("|" + value.toLowerCase() + "|")
          ? JSON.parse(value.toLowerCase())
          : value)
      : value;
    if (name) {
      switch (type.toLowerCase()) {
        case "checkbox":
          if (checked) {
            maybeArray(formParams, { name, value: booleanValue, arrayMode });
          }
          break;
        case "radio":
          if (checked) {
            formParams[name] = booleanValue;
          }
          break;
        case "select-multiple":
          const options = el.querySelectorAll("option[selected]");
          [...options].forEach((opt) => {
            const optValue = opt.value || opt.text;
            maybeArray(formParams, { name, value: optValue, arrayMode });
          });
          break;
        default:
          maybeArray(formParams, { name, value, arrayMode });
          break;
      }
    }
  });
  return formParams;
};

export default formSerialize;
