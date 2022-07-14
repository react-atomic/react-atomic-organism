import { useState, useEffect, useMemo } from "react";
import { Image } from "react-atomic-molecule";
import { win } from "win-doc";
import { useMounted } from "reshow-hooks";

import Change from "../organisms/Change";

const AnimateImage = (props) => {
  const {
    src,
    animate = {
      enter: "fadeIn-300",
      leave: "fadeOut-300",
    },
    ...restProps
  } = props;
  const [image, setImage] = useState();
  const _mount = useMounted();

  useEffect(() => {
    const oImg = new (win().Image)();
    oImg.onload = () => {
      if (_mount()) {
        setImage(<Image key={src} src={src} {...restProps} />);
      }
    };
    oImg.src = src;
  }, [src]);

  return useMemo(
    () => (
      <Change className="animate-image" {...animate}>
        {image}
      </Change>
    ),
    [image, animate]
  );
};

export default AnimateImage;
