/**
 * @param {?HTMLElement=} el
 * @returns {string|false}
 */
export const getSortId = (el) => {
  const sortId = el?.getAttribute("data-sort-id") || el?.id;
  return sortId || false;
};
