import React, { PureComponent } from "react";
import { Image } from "react-atomic-molecule";
const keys = Object.keys;

const stripHttpReg = /^(http)?(s)?(\:)?(\/\/)/gi;

export default class CDN extends PureComponent {
  render() {
    const { src, ...props } = this.props;
    const cdnProps = {};
    keys(props).forEach((key) => {
      if ("cdn" === key.substr(0, 3)) {
        cdnProps[key.substr(4)] = props[key];
        delete props[key];
      }
    });
    const query = keys(cdnProps)
      .map((key) => key + "=" + encodeURIComponent(cdnProps[key]))
      .join("&");
    const link = src.replace(stripHttpReg, "");
    const url = "//i2.wp.com/" + link + "?" + query;
    return <Image {...props} style={{ margin: "0 auto" }} src={url} />;
  }
}
