import React from "react";
import { build, Image, SemanticUI } from "react-atomic-molecule";
const keys = Object.keys;

const stripHttpReg = /^(http)?(s)?(\:)?(\/\/)/gi;

const CDN = (props) => {
  const {
    src,
    cdnHost,
    rawLink,
    linkComponent,
    linkProps,
    ...otherProps
  } = props;
  const cdnProps = {};
  keys(otherProps).forEach((key) => {
    if ("cdn" === key.substr(0, 3)) {
      cdnProps[key.substr(4)] = otherProps[key];
      delete otherProps[key];
    }
  });
  const query = keys(cdnProps)
    .map((key) => key + "=" + encodeURIComponent(cdnProps[key]))
    .join("&");
  const cdnImgUrl = src.replace(stripHttpReg, "");
  const url = `//${cdnHost}/${cdnImgUrl}?${query}`;
  const linkHref = src;
  const img = <Image {...otherProps} style={{ margin: "0 auto" }} src={url} />;
  const result = rawLink
    ? build(linkComponent)(
        {
          href: linkHref,
          ...linkProps,
        },
        img
      )
    : img;
  return result;
};

CDN.defaultProps = {
  cdnHost: "i2.wp.com",
  linkComponent: <SemanticUI atom="a" />,
};

export default CDN;
