import {
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

  const _mount = useRef(false);
  const oImg = useRef();

  useImperativeHandle(ref, () => ({
    getImageObject: () => oImg.current,
  }), []);

  useEffect(() => {
    _mount.current = true;
    return () => {
      _mount.current = false;
    };
  }, []);

  useEffect(() => {
    const oWin = win();
    if (!oWin) {
      return null;
    }
    oImg.current = new oWin.Image();
    oImg.current.onload = () => {
      if (_mount.current) {
        setImage(<Image key={src} src={src} {...otherProps} />);
      }
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

AnimateImage.displayName = "AnimateImage";

AnimateImage.defaultProps = {
  animate: {
    enter: "fadeIn-300",
    leave: "fadeOut-300",
  },
};

export default AnimateImage;
