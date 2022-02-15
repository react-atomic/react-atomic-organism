import React, {
  useState,
  forwardRef,
  useRef,
  useImperativeHandle,
} from "react";
import { SemanticUI } from "react-atomic-molecule";

import CarouselList from "../organisms/CarouselList";
import CarouselSwipe from "../organisms/CarouselSwipe";

const HorizontalScroll = forwardRef(({ listClassName, ...props }, ref) => {
  const [height, setHeight] = useState("auto");
  const listEl = useRef();
  const expose = {
    resetScroll: () => {
      const el = listEl.current?.getEl();
      if (el) {
        el.scrollLeft = 0;
      }
    },
  };
  useImperativeHandle(ref, () => expose, []);

  const handleHeight = (height) => {
    setHeight(height);
  };
  return (
    <SemanticUI
      style={{
        ...Styles.container,
        height,
      }}
    >
      <CarouselList
        {...props}
        innerContainer={
          <CarouselSwipe
            horizontal
            ref={listEl}
            className={listClassName}
            onHeight={handleHeight}
            disableScroll={"auto" === height ? true : false}
          />
        }
      />
    </SemanticUI>
  );
});

HorizontalScroll.displayName = "HorizontalScroll";
export default HorizontalScroll;

const Styles = {
  container: {
    overflow: "hidden",
  },
};
