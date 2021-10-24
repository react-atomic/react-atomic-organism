import React from "react";
import ParallaxBackground from "../organisms/ParallaxBackground";
import { SemanticUI } from "react-atomic-molecule";

const ParallaxBackgroundImage = ({backgroundImage, ...others}) => {
    let thisBackgroundImage = null;
    if (backgroundImage) {
      thisBackgroundImage = (
        <SemanticUI
          className="parllax-image"
          style={{
            ...Styles.backgroundImage,
            backgroundImage: 'url("' + backgroundImage + '")',
          }}
        />
      );
    }
    return <ParallaxBackground {...others} background={thisBackgroundImage} />;
};

export default ParallaxBackgroundImage;

const Styles = {
  backgroundImage: {
    backgroundPosition: "50% 50%",
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
    width: "100vw",
    height: "150vh",
    willChange: "scroll-position",
  },
};
