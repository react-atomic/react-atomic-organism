import React, { useState, useRef, useMemo, useEffect } from "react";
import { ScrollInfo } from "organism-react-scroll-nav";
import { reactStyle, mixClass, SemanticUI } from "react-atomic-molecule";
import getScrollInfo from "get-scroll-info";
import getOffset from "getoffset";
import merge from "array.merge";
import { win } from "win-doc";
import callfunc from "call-func";
import aniCal from "easing-lib/easeOutQuart";

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
  const { top: scrollInfoTop, scrollNodeHeight } = scrollInfo || {};
  const { top: elOffsetTop = 0, h: elOffsetH } = elOffset;
  const elViewTop = elOffsetTop - scrollInfoTop;
  const scrollDist = (speed * (elOffsetH + scrollNodeHeight)) / 2;
  const viewCenter =
    1 - (2 * (scrollNodeHeight - elViewTop)) / (scrollNodeHeight + elOffsetH);
  const posY = Math.abs(Math.round(scrollDist * viewCenter - elViewTop));
  return posY;
};

const handleScrollAni = (posY, setPosY) => {
  let beginTimeStamp = 0;
  const runScrollAni = (timeStamp) => {
    beginTimeStamp = beginTimeStamp || timeStamp;
    const elapsedTime = timeStamp - beginTimeStamp;
    setPosY((prevPosY) => {
      const go = posY - prevPosY;
      const duration = 1000;
      const nextPosY = Math.round(aniCal(elapsedTime, posY, go, duration));
      if (elapsedTime < duration && nextPosY !== posY) {
        requestAnimationFrame(runScrollAni);
      }
      return nextPosY;
    });
  };
  requestAnimationFrame(runScrollAni);
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

  const [posY, setPosY] = useState(0);
  const lastCalData = useRef({});

  useEffect(() => {
    lastCalData.current = {
      ...lastCalData.current,
      speed,
      targetInfo,
      scrollInfo,
    };
    if (scrollInfoTop) {
      const posY = calOffset(lastCalData.current);
      if (posY) {
        handleScrollAni(posY, setPosY);
      }
    }
  }, [isOnScreen, targetInfoTop, targetInfoH, scrollInfoTop, scrollNodeHeight]);

  useEffect(() => {
    const handleResize = () => {
      lastCalData.current.scrollInfo = getScrollInfo();
      const posY = calOffset(lastCalData.current);
      if (posY) {
        setPosY(posY);
      }
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
    return reactStyle(
      {
        ...Styles.backgroundLayer,
        transform: [`translate3d(0, ${posY}px, 0)`],
      },
      false,
      false
    );
  }, [posY]);

  return {
    handler,
    styles,
    layerStyles,
    background,
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
    top: "-60%",
    left: 0,
    zIndex: -1,
    willChange: "scroll-position",
  },
  backgroundLayer: {
    position: "relative",
    willChange: "transform, opacity",
  },
};
