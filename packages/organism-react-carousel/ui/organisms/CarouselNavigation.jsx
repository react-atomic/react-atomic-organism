import React, { Children, useState, useEffect, useRef, useMemo } from "react";
import { build, mixClass, reactStyle, SemanticUI } from "react-atomic-molecule";
import get from "get-object-value";
import callfunc from "call-func";

import CarouselList from "../organisms/CarouselList";
import Carousel from "../organisms/Carousel";

let gLastX;
let gLastY;
let mouseMoveTimer;

const CarouselNavigation = (props) => {
  const {
    style,
    className,
    carouselAttr,
    container,
    children,
    thumbAttr,
    thumbListStyle,
    infinity,
    selected: propsSelected,
    onChange,
    onSelected,
    hideThumb,
    ...others
  } = props;

  const [selected, setSelected] = useState();
  const [childs, setChilds] = useState();
  const thisBackward = useRef();
  const thisForward = useRef();

  const thisThumbAttr = {
    ...carouselAttr,
    ...thumbAttr,
    hoverStyle: Styles.thumbHover,
    className: "link card",
    style: {
      ...get(carouselAttr, ["style"], {}),
      ...Styles.thumb,
      ...get(thumbAttr, ["style"], {}),
    },
  };

  useEffect(() => {
    const childs = [];
    Children.forEach(children, (child) => {
      if (child) {
        childs.push(child);
      }
    });
    setChilds(childs);
    let selected;
    if (childs && childs.length) {
      // check propsSelected is valid.
      childs.some((child, i) => {
        const key = get(child, ["props", "name"]) || i;
        if (key === propsSelected) {
          selected = key;
          return true;
        } else {
          return false;
        }
      });
      if (!selected) {
        selected = get(childs.slice(0, 1)[0], ["props", "name"], 0);
      }
      setSelected(selected);
    }
  }, [propsSelected, children]);

  const handleLeft = () => {
    handleChange(thisBackward.current);
  };

  const handleRight = () => {
    handleChange(thisForward.current);
  };

  const handleChange = (selected) => {
    setSelected(selected);
    callfunc(onChange, [selected]);
  };

  return useMemo(() => {
    if (!childs || !childs.length) {
      return null;
    }

    thisBackward.current = null;
    thisForward.current = null;
    let activeChildren = null;
    let activeEl = false;
    const thumbChild = [];

    childs.forEach((child, i) => {
      const key = get(child, ["props", "name"]) || i;
      let activeStyle = {}; //need always reset
      const isSelected = key === selected;
      childs[i] = child = build(child)({
        ...carouselAttr,
        name: key,
        key,
      });
      if (isSelected) {
        others.key = key;
        activeStyle = Styles.thumbActive;
        activeEl = child;
        activeChildren = onSelected({
          selected,
          childs,
          activeEl,
          handleChange,
        });
      } else {
        if (!activeEl) {
          thisBackward.current = key;
        } else {
          if (!thisForward.current) {
            thisForward.current = key;
          }
        }
      }
      if (!hideThumb) {
        const newThumbChildAttr = {
          key,
          ...thisThumbAttr,
          className: mixClass(thisThumbAttr.className, {
            active: isSelected,
          }),
          onClick: () => {
            handleChange(key);
          },
          onMouseMove: (e) => {
            if (mouseMoveTimer) {
              clearTimeout(mouseMoveTimer);
              mouseMoveTimer = null;
            }
            const lastX = e.screenX;
            const lastY = e.screenY;
            mouseMoveTimer = setTimeout(() => {
              gLastX = lastX;
              gLastY = lastY;
            }, 100);
          },
          onMouseOver: (e) => {
            const lastX = e.screenX;
            const lastY = e.screenY;
            if (gLastX === lastX && gLastY === lastY) {
              return;
            } else {
              handleChange(key);
            }
          },
          style: null,
          styles: reactStyle(
            {
              ...thisThumbAttr.style,
              ...activeStyle,
            },
            false,
            false
          ),
        };
        let thisChild = get(child, ["props", "thumbContainer"]);
        if (thisChild) {
          thisChild = <Carousel>{thisChild}</Carousel>;
        } else {
          thisChild = child;
        }
        thumbChild.push(build(thisChild)(newThumbChildAttr));
      }
    });

    const thisChildren = [];
    thisChildren.push(
      <CarouselList key={0} onLeft={handleLeft} onRight={handleRight}>
        {build(activeChildren)(others)}
      </CarouselList>
    );

    if (!hideThumb) {
      thisChildren.push(
        //thumb
        <CarouselList
          key={1}
          {...others}
          style={{ ...Styles.thumbList, ...thumbListStyle }}
          className="cards thumbs"
        >
          {thumbChild}
        </CarouselList>
      );
    }
    if (null === thisForward.current && infinity && childs) {
      thisForward.current = childs.slice(0, 1)[0].props.name;
    }
    if (null === thisBackward.current && infinity && childs) {
      thisBackward.current = childs.slice(-1)[0].props.name;
    }
    return build(container)(
      {
        style: {
          ...Styles.container,
          ...style,
        },
        className: mixClass(className, "carousel-navigation"),
      },
      thisChildren
    );
  }, [childs, selected]);
};

CarouselNavigation.defaultProps = {
  container: SemanticUI,
  infinity: true,
};

export default CarouselNavigation;

const Styles = {
  container: {
    position: "relative",
    marginBottom: 35,
  },
  thumbList: {
    fontSize: "1rem",
    width: "77%",
    margin: "-85px auto 0",
    minHeight: 50,
    padding: 5,
    whiteSpace: "normal",
  },
  thumb: {
    margin: "0 5px 10px 0",
    opacity: 0.5,
    overflow: "hidden",
    width: 50,
    height: 50,
    verticalAlign: "bottom",
  },
  thumbHover: {
    opacity: 1,
  },
  thumbActive: {
    opacity: 1,
    border: "1px solid #fff",
  },
};
