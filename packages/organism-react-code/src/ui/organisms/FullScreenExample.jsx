import { useState, useRef, useEffect, useCallback } from "react";
import { FullScreen } from "organism-react-popup";
import { Button, SemanticUI } from "react-atomic-molecule";
import callfunc from "call-func";
import { doc } from "win-doc";

const getLastHash = () => {
  const urls = document.URL.split("#");
  const lastIndex = urls.length - 1;
  const lastAnchor = "#" + urls[lastIndex];
  return { lastAnchor };
};

const defaultUpdateUrl = (id) =>
  history.pushState("", "", doc().URL + "#" + id);

const defaultResetUrl = (id) => {
  const url = doc().URL;
  const idIndex = url.lastIndexOf("#" + id);
  if (-1 !== idIndex) {
    history.pushState("", "", url.substring(0, idIndex));
  }
};

const FullScreenExample = ({
  button = "Open full screen",
  anchorLocator = getLastHash,
  updateUrl = defaultUpdateUrl,
  resetUrl = defaultResetUrl,
  children,
  id,
  onClose,
  path,
  ...restProps
}) => {
  const [showFullScreen, setShowFullScreen] = useState();
  const lastTrigger = useRef();

  useEffect(() => {
    const { lastAnchor } = callfunc(anchorLocator, [path]) || {};
    if ("#" + id === lastAnchor) {
      setShowFullScreen(true);
    } else {
      setShowFullScreen(prev => {
        if (prev) {
          lastTrigger.current = "path";
        }
        return false;
      });
    }
  }, [anchorLocator, id, path]);

  const handleClick = useCallback(() => {
    const { lastAnchor } = callfunc(anchorLocator, [path]) || {};
    if (id && id !== lastAnchor) {
      updateUrl(id);
    }
    setShowFullScreen(true);
  }, [anchorLocator, id, path]);

  const handleClose = useCallback(() => {
    if (lastTrigger.current !== "path") {
      callfunc(resetUrl, [id]);
    }
    callfunc(onClose);
    setShowFullScreen(false);
    lastTrigger.current = null;
  }, [resetUrl, id, onClose]);

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
