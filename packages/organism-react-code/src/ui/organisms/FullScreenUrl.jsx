//@ts-check

import * as React from "react";
import { getUrlReducer, UrlReturn } from "reshow-url";
import { getAnchorPath } from "anchor-lib";

import FullScreenExample from "../organisms/FullScreenExample";
import { doc } from "win-doc";

const updateUrl = (/**@type String*/ id) =>
  getUrlReducer().dispatch("url", { url: doc().URL + "#" + id });
const resetUrl = (/**@type String*/ id) =>
  getUrlReducer().dispatch("resetAnchor", { anchor: id });
const FullScreenUrl = ({ id = "fullscreen", ...props }) => (
  <UrlReturn initStates={{ ":hash": "path" }}>
    {(/**@type any*/ urlProps) => {
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
