import React, {
  useEffect,
  useState,
  useRef,
  useImperativeHandle,
  useMemo,
  forwardRef,
  Children,
} from "react";
import {
  build,
  useLazyInject,
  reactStyle,
  SemanticUI,
} from "react-atomic-molecule";
import get from "get-object-value";

import genVerticalRollStyle from "../../src/genVerticalRollStyle";

const getTypingNextWordAniClassName = (el, sec) => {
  const elWidth = el.offsetWidth;
  if (elWidth <= 1) {
    return null;
  }
  const elLen = get(el, ["textContent", "length"], 10);
  const width = Math.floor(elWidth + elWidth / elLen);
  const aniName = ("typingNextWord-" + width + "-" + sec).replace(".", "-");
  if (injects[aniName]) {
    return aniName;
  }
  reactStyle(
    [
      {
        maxWidth: 0,
      },
      {
        maxWidth: width,
      },
    ],
    ["@keyframes " + aniName, "0%", "100%"],
    aniName + "-keyframe"
  );
  reactStyle(
    {
      animation: [`${aniName} ${sec}s steps(${elLen + 1}) infinite alternate`],
      visibility: "visible !important",
      transform: ["rotateZ(360deg)"],
    },
    "." + aniName,
    aniName + "-ani"
  );
  injects[aniName] = true;
  return aniName;
};

const TypingItem = (props) => {
  const { children, sec, ...others } = props;
  const [classes, setClasses] = useState();
  const lastClasses = useRef();
  const lastEl = useRef();

  const handleEl = (el) => {
    if (el) {
      if (!lastEl.current || !lastEl.current.isSameNode(el)) {
        lastEl.current = el;
        const next = getTypingNextWordAniClassName(el, sec);
        if (next && lastClasses.current !== next) {
          lastClasses.current = next;
          setClasses(next);
        }
      }
    }
  };

  return (
    <SemanticUI {...others} className="typing-item">
      <SemanticUI
        className={classes}
        style={Styles.typingItemText}
        refCb={handleEl}
      >
        {children}
      </SemanticUI>
      <SemanticUI styles={injects.typingCursor}> | </SemanticUI>
    </SemanticUI>
  );
};

const useTyping = (props) => {
  injects = useLazyInject(InjectStyles);
  const {
    autoStart = true,
    sec = 2,
    color = "#000",
    height: propsHeight = 80,
    children,
    background,
  } = props;
  const [isRun, setIsRun] = useState(autoStart);
  const [typingItemStyles, setTypingItemStyles] = useState();

  const height = parseInt(propsHeight, 10);
  const rowLen = children?.length;
  useEffect(() => {
    const aniStyle = genVerticalRollStyle(children, height, sec);
    if (aniStyle) {
      setTypingItemStyles(aniStyle);
    }
  }, [rowLen, height, sec]);

  const expose = {
    start: () => {
      setIsRun(true);
    },
    stop: () => {
      setIsRun(false);
    },
  };

  return {
    expose,
    color,
    background,
    height,
    isRun: isRun && typingItemStyles,
    typingItemStyles,
    children,
    sec,
  };
};

const Typing = forwardRef((props, ref) => {
  const {
    expose,
    color,
    background,
    height,
    isRun,
    typingItemStyles,
    children,
    sec,
  } = useTyping(props);
  useImperativeHandle(ref, () => expose, []);
  return useMemo(() => {
    const items = [];
    if (isRun) {
      // need calculate offsetWidth
      const typeItem = build(
        <TypingItem sec={sec} styles={typingItemStyles} />
      );
      Children.forEach(children, (item, key) => {
        items.push(typeItem({ key }, item.props.children));
      });
    }
    return (
      <SemanticUI
        className="react-typing-comp"
        style={{
          ...Styles.typingContainer,
          color,
          background,
          height,
        }}
      >
        {items}
      </SemanticUI>
    );
  }, [isRun, color, background, height]);
});

Typing.displayName = "Typing";
export default Typing;

const Styles = {
  typingContainer: {
    overflow: "hidden",
  },
  typingItemText: {
    display: "inline-block",
    overflow: "hidden",
    visibility: "hidden",
    whiteSpace: "nowrap",
    boxSizing: "border-box",
  },
};

let injects;
const InjectStyles = {
  typingCursor: [
    {
      display: "inline-block",
      position: "relative",
      marginLeft: 5,
      top: 1,
      verticalAlign: "top",
      animation: ["typingBlink 1s steps(2) infinite"],
      transform: ["rotateZ(360deg)"],
    },
  ],
  typingBlink: [
    [
      {
        opacity: "1",
      },
      {
        opacity: "0",
      },
    ],
    ["@keyframes typingBlink", "0%, 100%", "50%"],
  ],
};
