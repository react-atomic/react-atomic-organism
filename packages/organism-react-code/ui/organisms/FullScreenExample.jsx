import { useState, useEffect } from "react";
import { FullScreen } from "organism-react-popup";
import { Button, SemanticUI } from "react-atomic-molecule";

import callfunc from "call-func";

const getLastHash = () => {
  const urls = document.URL.split("#");
  const lastIndex = urls.length - 1;
  const last = urls[lastIndex];
  return last;
};

const updateUrl = (url) => history.pushState("", "", url);

const FullScreenExample = ({
  button = "Open full screen",
  children,
  id,
  onClose,
  ...restProps
}) => {
  const [showFullScreen, setShowFullScreen] = useState();

  useEffect(() => {
    const last = getLastHash();
    if (id === last) {
      setShowFullScreen(true);
    }
  }, []);

  const handleClick = () => {
    const last = getLastHash();
    if (id && id !== last) {
      updateUrl(document.URL + "#" + id);
    }
    setShowFullScreen(true);
  };

  const handleClose = () => {
    const url = document.URL;
    const idIndex = url.lastIndexOf("#" + id);
    if (-1 !== idIndex) {
      updateUrl(url.substring(0, idIndex));
    }
    callfunc(onClose);
    setShowFullScreen(false);
  };

  let thisFullScreen = null;
  if (showFullScreen) {
    thisFullScreen = (
      <FullScreen {...restProps} onClose={handleClose}>
        {children}
      </FullScreen>
    );
  }
  return (
    <>
      <Button onClick={handleClick}>{button}</Button>
      {thisFullScreen}
    </>
  );
};

export default FullScreenExample;
