import React from "react";
import ParallaxBackground from "../organisms/ParallaxBackground";
import { SemanticUI } from "react-atomic-molecule";

const ParallaxBackgroundImage = ({backgroundImage, backgroundImageStyle, ...others}) => {
    let thisBackgroundImage = null;
    if (backgroundImage) {
      thisBackgroundImage = (
        <SemanticUI
          className="parllax-image"
          style={{
            ...Styles.backgroundImage,
            ...backgroundImageStyle,
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
    minWidth: "100vw",
    minHeight: "100vh",
    willChange: "scroll-position",
  },
};
