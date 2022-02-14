import React, { useState } from "react";
import { SemanticUI } from "react-atomic-molecule";

import CarouselList from "../organisms/CarouselList";
import CarouselSwipe from "../organisms/CarouselSwipe";

const HorizontalScroll = (props) => {
  const [height, setHeight] = useState("auto");
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
        innerContainer={<CarouselSwipe horizontal onHeight={handleHeight} />}
      />
    </SemanticUI>
  );
};

export default HorizontalScroll;

const Styles = {
  container: {
    overflow: "hidden",
  },
};
