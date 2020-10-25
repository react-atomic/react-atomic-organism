import React, { Component } from "react";

const keys = Object.keys;

/**
 * https://developers.facebook.com/docs/plugins/page-plugin
 */
class FBPage extends Component {
  static defaultProps = {
    appId: "1579401905644484",
    width: 340,
    height: 500,
    tabs: "timeline",
    hide_cover: false,
    show_facepile: true,
    hide_cta: false,
    small_header: false,
    adapt_container_width: true,
  };

  constructor(props) {
    super(props);
    this.state = {
      load: 0,
    };
  }

  componentDidMount() {
    this.setState({
      load: 1,
    });
  }

  render() {
    const { load } = this.state;
    if (!load) {
      return null;
    }
    const {
      page,
      appId,
      width,
      height,
      tabs,
      hide_cover,
      show_facepile,
      hide_cta,
      small_header,
      adapt_container_width,
    } = this.props;
    let src = "https://www.facebook.com/plugins/page.php";
    let params = {
      href: "https://www.facebook.com/" + page,
      appId: appId,
      width: width,
      height: height,
      tabs: tabs,
      hide_cover: hide_cover,
      show_facepile: show_facepile,
      hide_cta: hide_cta,
      small_header: small_header,
      adapt_container_width: adapt_container_width,
    };

    const paramKeys = keys(params);
    let arr = [];
    paramKeys.forEach((key) => {
      arr.push(key + "=" + encodeURIComponent(params[key]));
    });
    src += "?" + arr.join("&");

    return (
      <iframe
        style={Styles.iframe}
        src={src}
        width={width}
        height={height}
        onLoad={() => {
          console.log("fb page load");
        }}
      />
    );
  }
}
export default FBPage;

const Styles = {
  iframe: {},
};
