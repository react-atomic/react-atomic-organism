import { getAnchorPath, urlDispatch, UrlReturn } from "reshow-url";
import FullScreenExample from "../organisms/FullScreenExample";
import { doc } from "win-doc";

const updateUrl = (id) => urlDispatch("url", { url: doc().URL + "#" + id });
const resetUrl = (id) => urlDispatch("resetAnchor", id);
const FullScreenUrl = ({ id = "fullscreen", ...props }) => (
  <UrlReturn initStates={{ ":hash": "path" }}>
    {(urlProps) => {
      return (
        <FullScreenExample
          {...{ ...props, ...urlProps }}
          id={id}
          anchorLocator={getAnchorPath}
          updateUrl={updateUrl}
          resetUrl={resetUrl}
        />
      );
    }}
  </UrlReturn>
);

export default FullScreenUrl;
