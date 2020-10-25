import React from "react";
import { build, mixClass, SemanticUI } from "react-atomic-molecule";

const Hero = (props) => {
  const { className, component, backgroundImage, style, ...others } = props;
  const thisStyle = {};
  if (backgroundImage) {
    thisStyle.backgroundImage = "url(" + backgroundImage + ")";
  }
  const classes = mixClass(className, "hero-component");
  return build(component)({
    style: {
      ...Styles.hero,
      ...style,
      ...thisStyle,
    },
    className: classes,
    ...others,
  });
};

Hero.defaultProps = { component: SemanticUI };

export default Hero;

const Styles = {
  hero: {
    display: "block",
    minHeight: "100vh",
    backgroundClip: "border-box",
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "50% 50%",
  },
};
