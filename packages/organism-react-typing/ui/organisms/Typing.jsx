import React, {
  useEffect,
  useState,
  useRef,
  useImperativeHandle,
  useMemo,
  forwardRef,
} from "react";
import {
  build,
  useLazyInject,
  reactStyle,
  SemanticUI,
} from "react-atomic-molecule";
import get from "get-object-value";

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

  const handleEl = (el) => {
    if (el) {
      const next = getTypingNextWordAniClassName(el, sec);
      if (next && lastClasses.current !== next) {
        lastClasses.current = next;
        setClasses(next);
      }
    }
  };

  return (
    <SemanticUI {...others}>
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

  useEffect(() => {
    const update = (props) => {
      if (!children) {
        return null;
      }
      const itemLength = children.length;
      const aniName = "typingNextLine";
      const styleId = aniName + "-" + itemLength + "-" + height;
      const typingItemStyles = reactStyle(
        {
          position: "relative",
          animation: [
            `${styleId} ${itemLength * 2 * sec}s steps(${itemLength}) infinite`,
          ],
          height,
        },
        null,
        false
      );
      reactStyle(
        [{ top: 0 }, { top: 0 - height * itemLength }],
        ["@keyframes " + styleId, "0%", "100%"],
        styleId
      );
      setTypingItemStyles(typingItemStyles);
    };
    update(props);
  }, [children?.length, height, sec]);

  const expose = {
    start: () => {
      setIsRun(true);
    },
    stop: () => {
      setIsRun(false);
    },
  };

  const items = [];
  if (isRun && typingItemStyles) {
    // need calculate offsetWidth
    const typeItem = build(
      <TypingItem sec={props.sec} styles={typingItemStyles} />
    );
    React.Children.forEach(children, (item, key) => {
      items.push(typeItem({ key }, item.props.children));
    });
  }

  return { expose, items, color, background, height };
};

const Typing = forwardRef((props, ref) => {
  const { items, expose, color, background, height } = useTyping(props);
  useImperativeHandle(ref, () => expose, []);
  return useMemo(() => {
    return (
      <SemanticUI
        className="react-typing"
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
  }, [items, color, background, height]);
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
      animation: ["typingBlink 1s infinite"],
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
