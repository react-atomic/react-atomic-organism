import React, { useState, useRef, useMemo, useEffect } from "react";
import { ScrollInfo } from "organism-react-scroll-nav";
import { reactStyle, mixClass, SemanticUI } from "react-atomic-molecule";
import getScrollInfo from "get-scroll-info";
import getOffset from "getoffset";
import merge from "array.merge";
import { win } from "win-doc";
import callfunc from "call-func";
import { usePrevious, useSyncChange } from "reshow-hooks";

const calOffset = ({ lastEl, speed, targetInfo, scrollInfo }) => {
  let elOffset;
  const el = lastEl.current;
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

const useParallax = (props) => {
  const {
    refCb, // pass from ScrollInfo (ScrollSpy)
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
  const prevScrollInfoTop = usePrevious(scrollInfoTop);

  const [posY, setPosY] = useState({ val: 0 });
  const lastCalData = useRef({});

  if (!isNaN(scrollInfoTop) && prevScrollInfoTop !== scrollInfoTop) {
    lastCalData.current = {
      ...lastCalData.current,
      lastEl: refCb,
      speed,
      targetInfo,
      scrollInfo,
    };
    const nextY = calOffset(lastCalData.current);
    if (!isNaN(nextY)) {
      setPosY({val: nextY});
    }
  }

  useEffect(() => {
    const handleResize = () => {
      lastCalData.current.scrollInfo = getScrollInfo();
      const nextY = calOffset(lastCalData.current);
      setPosY({ val: nextY });
    };
    const oWin = win();
    oWin.addEventListener("resize", handleResize);
    return () => {
      oWin.removeEventListener("resize", handleResize);
    };
  }, []);

  const handler = {
    el: refCb,
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
