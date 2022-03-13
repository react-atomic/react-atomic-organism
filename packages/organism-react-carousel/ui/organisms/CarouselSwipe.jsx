import React, {
  useEffect,
  useRef,
  forwardRef,
  useImperativeHandle,
} from "react";
import { mixClass, SemanticUI, List } from "react-atomic-molecule";
import callfunc from "call-func";

const getX = (e) => {
  const posX = e.touches !== undefined ? e.touches[0].pageX : e.clientX;
  return posX;
};

const CarouselSwipe = forwardRef((props, ref) => {
  const { onHeight, className, disableScroll, ...others } = props;
  const lastEl = useRef();
  const lastDragging = useRef();
  const startX = useRef();
  const expose = {
    getEl: () => lastEl.current,
  };
  const handler = {
    swipeStart: (e) => {
      lastDragging.current = true;
      startX.current = getX(e);
    },
    swipeMove: (e) => {
      if (!lastDragging.current) {
        return false;
      }
      const posX = getX(e);
      const move = startX.current - posX;
    },
    swipeEnd: (e) => {
      lastDragging.current = false;
    },
  };
  useImperativeHandle(ref, () => expose, []);
  useEffect(() => {
    let timer;
    if (onHeight) {
      timer = setTimeout(
        () => callfunc(onHeight, [lastEl.current.offsetHeight]),
        700
      );
    }
    return () => {
      if (timer) {
        clearTimeout(timer);
      }
    };
  }, []);
  const containerStyle = { ...Styles.container };
  if (disableScroll) {
    containerStyle.overflow = "hidden";
  }
  return (
    <SemanticUI style={containerStyle} refCb={lastEl}>
      <List
        className={mixClass("carousel-swipe", className)}
        style={Styles.inside}
        {...others}
        onMouseDown={handler.swipeStart}
        onMouseMove={handler.swipeMove}
        onMouseUp={handler.swipeEnd}
        onMouseLeave={handler.swipeMove}
        onTouchStart={handler.swipeStart}
        onTouchMove={handler.swipeMove}
        onTouchEnd={handler.swipeEnd}
        onTouchCancel={handler.swipeMove}
      />
    </SemanticUI>
  );
});

export default CarouselSwipe;

const Styles = {
  container: {
    overflow: "scroll hidden",
    position: "relative",
    paddingBottom: 5,
    fontSize: "1rem",
  },
  inside: {
    display: "inline-block",
    position: "relative",
    whiteSpace: "nowrap",
    overflow: "hidden",
  },
};
