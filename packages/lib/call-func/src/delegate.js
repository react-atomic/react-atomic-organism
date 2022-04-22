import query from "css-query-selector";
import { IS_ARRAY } from "reshow-constant";

import callfunc from "./callfunc";
import { register } from "./register";

const delegate = (el, type, childs, defaultFunc) => {
  if (!el || !childs || !childs.length) {
    return;
  }
  if (!IS_ARRAY(childs)) {
    childs = [{ select: childs }];
  }
  register(query.el(el)).addEventListener(type, (e) => {
    const tar = e.target;
    childs.some(({ select, func = defaultFunc }) => {
      if ("debug" === select) {
        return callfunc(func, [e]);
      } else {
        const doms = query.from(el).all(select) || [];
        let i = doms.length;
        while (i--) {
          const childEl = doms[i];
          if (tar.isSameNode(childEl) || childEl.contains(tar)) {
            return callfunc(func, [
              {
                type: e.type,
                target: e.target,
                currentTarget: childEl,
                nativeEvent: e,
              },
            ]);
          }
        }
      }
    });
  });
};
export default delegate;
