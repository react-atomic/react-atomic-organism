import Return from "reshow-return";
import { build, mixClass, SemanticUI } from "react-atomic-molecule";
import get from "get-object-value";
import getStyle from "get-style";

import BasePopup from "../molecules/BasePopup";
import popupStore, { SHOW_KEY } from "../../src/stores/popupStore";

class PopupOverlay extends BasePopup {
  resetStyle(key, thisStyle) {
    const value = get(this.state, [key], () => get(this.props, [key]));
    if ("undefined" !== typeof value) {
      thisStyle[key] = value + "px";
    }
  }

  renderOverlay(props) {
    const { className, ...others } = props;
    const classes = mixClass("popup", className);
    return <SemanticUI {...others} className={classes} />;
  }

  shouldShow(show) {
    if (!show) {
      return null;
    }
    const {
      targetEl,
      toPool,
      alignParams,
      retryAt,
      isFollowTransform,
      className,
      style,
      group,
      ...others
    } = this.props;

    /* <!-- Handle Style */
    const thisStyle = { ...style };
    this.resetStyle("top", thisStyle);
    this.resetStyle("left", thisStyle);
    this.resetStyle("width", thisStyle);
    this.resetStyle("height", thisStyle);
    if (targetEl && isFollowTransform) {
      thisStyle.transform = getStyle(targetEl, "transform");
    }
    others.style = thisStyle;
    /*  Handle Style --> */

    const refCb = get(this.state, ["refCb"], () => get(this.props, ["refCb"]));
    if (refCb) {
      others.refCb = refCb;
    }

    others.className = mixClass(
      className,
      get(this, ["state", "className"]),
      "visible"
    );
    return this.renderOverlay(others);
  }

  render() {
    /**
     * Use build + anonymous function to suppress render.
     */
    return this.state.hasError
      ? null
      : build(Return)(
          {
            store: popupStore,
            initStates: [SHOW_KEY],
          },
          (props) => {
            const name = this.props.name;
            const show = get(props[SHOW_KEY], [name]);
            return this.shouldShow(show);
          }
        );
  }
}

export default PopupOverlay;
