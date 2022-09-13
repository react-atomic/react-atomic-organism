// @ts-check
import { ajaxDispatch } from "organism-react-ajax";

/**
 * @param {string} url 
 */
const switchPage = (url) => {
  ajaxDispatch("ajaxGet", {
    url,
    disableAjax: true,
    updateUrl: true,
    scrollBack: true,
  });
};

export default switchPage;
