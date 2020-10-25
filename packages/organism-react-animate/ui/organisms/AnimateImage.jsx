import React, {
  useState,
  useEffect,
  useMemo,
  useRef,
  forwardRef,
  useImperativeHandle,
} from "react";
import { Image } from "react-atomic-molecule";
import { win } from "win-doc";

import Change from "../organisms/Change";

const AnimateImageComp = (props, ref) => {
  const { src, animate, ...otherProps } = props;
  const [image, setImage] = useState();

  const oImg = useRef();

  useImperativeHandle(ref, () => ({
    getImageObject: () => oImg.current,
  }));

  useEffect(() => {
    const oWin = win();
    if (!oWin) {
      return null;
    }
    oImg.current = new oWin.Image();
    oImg.current.onload = () => {
      setImage(<Image src={src} {...otherProps} />);
    };
    oImg.current.src = src;
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

const AnimateImage = forwardRef(AnimateImageComp);

AnimateImage.defaultProps = {
  animate: {
    enter: "fadeIn-300",
    leave: "fadeOut-300",
  },
};

export default AnimateImage;
