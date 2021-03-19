import ajaxStore from "./stores/ajaxStore";

const isRunAjax = (props) => {
  if (props.ajax) {
    return props.ajax;
  }
  const state = ajaxStore.getState();
  return state.get("ajax");
};

export default isRunAjax;
