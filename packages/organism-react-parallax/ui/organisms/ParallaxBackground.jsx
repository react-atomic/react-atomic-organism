import React, { useState, useRef, useMemo, useEffect } from "react";
import { ScrollInfo } from "organism-react-scroll-nav";
import { reactStyle, mixClass, SemanticUI } from "react-atomic-molecule";
import getScrollInfo from "get-scroll-info";
import getOffset from "getoffset";
import merge from "array.merge";
import { win } from "win-doc";
import callfunc from "call-func";

const calOffset = ({ el, speed, targetInfo, scrollInfo }) => {
  let elOffset;
  if (el) {
    elOffset = getOffset(el);
  } else {
    elOffset = targetInfo;
  }
  if (!elOffset) {
    return;
  }
  const { top: elOffsetTop = 0, h: elOffsetH } = elOffset;

  const posY = speed * (scrollInfo.top - elOffsetTop);
  return posY;
};

const handleScrollAni = (nextY, setPosY) => {
  const runScrollAni = (timeStamp) => {
    setPosY((prevPosY) => {
      return {
        val: nextY,
      };
    });
  };
  runScrollAni();
};

const useParallax = (props) => {
  const {
    refCb,
    speed,
    style,
    styles: propStyles,
    children,
    targetInfo,
    background,
    ...others
  } = props;

  const {
    scrollInfo,
    isOnScreen,
    top: targetInfoTop,
    h: targetInfoH,
  } = targetInfo || {};

  const { top: scrollInfoTop, scrollNodeHeight } = scrollInfo || {};

  const [posY, setPosY] = useState({ val: 0 });
  const lastCalData = useRef({});

  useEffect(() => {
    lastCalData.current = {
      ...lastCalData.current,
      speed,
      targetInfo,
      scrollInfo,
    };
    if (!isNaN(scrollInfoTop)) {
      const nextY = calOffset(lastCalData.current);
      if (!isNaN(nextY)) {
        handleScrollAni(nextY, setPosY);
      }
    }
  }, [isOnScreen, targetInfoTop, targetInfoH, scrollInfoTop, scrollNodeHeight]);

  useEffect(() => {
    const handleResize = () => {
      lastCalData.current.scrollInfo = getScrollInfo();
      const nextY = calOffset(lastCalData.current);
      setPosY({ val: nextY });
    };
    callfunc(win().addEventListener, ["resize", handleResize]);
    return () => {
      callfunc(win().removeEventListener, ["resize", handleResize]);
    };
  }, []);

  const handler = {
    el: (el) => {
      if (el) {
        refCb(el);
        lastCalData.current.el = el;
      }
    },
  };

  const styles = useMemo(() => {
    return merge(
      reactStyle(
        {
          ...Styles.content,
          ...style,
        },
        false,
        false
      ),
      styles
    );
  }, [style, styles]);

  const layerStyles = useMemo(() => {
    if (!isNaN(posY.val)) {
      return reactStyle(
        {
          ...Styles.backgroundLayer,
          transform: [`translate3d(0, ${posY.val}px, 0)`],
        },
        false,
        false
      );
    }
  }, [posY.val]);

  const thisBackground = layerStyles ? background : null;

  return {
    handler,
    styles,
    layerStyles,
    background: thisBackground,
    children,
    others,
  };
};

const ParallaxContent = (props) => {
  const { handler, styles, layerStyles, background, children, others } =
    useParallax(props);
  return (
    <SemanticUI {...others} refCb={handler.el} styles={styles}>
      {children}
      <SemanticUI className="parllax-background" style={Styles.background}>
        <SemanticUI className="parllax-layer" styles={layerStyles}>
          {background}
        </SemanticUI>
      </SemanticUI>
    </SemanticUI>
  );
};

const ParallaxBackground = ({
  container = ParallaxContent,
  noDelay = true,
  speed = 0.5,
  className,
  ...props
}) => (
  <ScrollInfo
    {...props}
    className={mixClass(className, "parallax")}
    container={container}
    noDelay={noDelay}
    speed={speed}
  />
);

export default ParallaxBackground;

const Styles = {
  content: {
    overflow: "hidden",
    position: "relative",
    zIndex: 0,
  },
  background: {
    position: "absolute",
    top: 0,
    left: 0,
    zIndex: -1,
    willChange: "scroll-position",
  },
  backgroundLayer: {
    position: "relative",
    willChange: "transform, opacity",
  },
};
