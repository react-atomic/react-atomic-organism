import React, { Component } from "react";

/**
 * Production please use
 * import ScrollAnimate from "organism-react-scroll-animate"
 */
import ScrollAnimate from "../../src/index";

const BlackCircle = (props) => (
  <ScrollAnimate {...props} style={Styles.block}>
    <div
      style={{
        ...Styles.circle,
        background: "#000",
        color: "#fff",
      }}
    >
      {props.children}
    </div>
  </ScrollAnimate>
);

const WhiteCircle = (props) => (
  <ScrollAnimate {...props} style={Styles.block}>
    <div
      style={{
        ...Styles.circle,
        border: "1px solid #000",
      }}
    >
      {props.children}
    </div>
  </ScrollAnimate>
);

class Index extends Component {
  render() {
    return (
      <div>
        <div style={Styles.row}>
          <BlackCircle once={false} enter="fadeInRight-1000">
            Fade in right
          </BlackCircle>
          <WhiteCircle once={false} enter="fadeInLeft-1000">
            Fade in left
          </WhiteCircle>
          <BlackCircle once={false} enter="fadeInUp-1000">
            Fade in up !!!
          </BlackCircle>
        </div>
        <div style={Styles.row}>
          <BlackCircle once={true} enter="fadeInLeft-1000">
            Fade in left (once)
          </BlackCircle>
          <WhiteCircle once={false} enter="fadeInDown-1000">
            Fade in down
          </WhiteCircle>
          <BlackCircle once={true} enter="fadeInRight-1000">
            Right (once) 2
          </BlackCircle>
        </div>
        <div style={Styles.row}>
          <BlackCircle
            once={false}
            enter="fadeOutRight-1000"
            id="last"
            isKeep={true}
          >
            Fade out right
          </BlackCircle>
          <WhiteCircle once={false} enter="fadeOutUp-1000">
            Fade out up
          </WhiteCircle>
          <BlackCircle once={false} enter="fadeOutLeft-1000">
            Out left 333
          </BlackCircle>
        </div>
      </div>
    );
  }
}

export default Index;

const size = "100px";
const Styles = {
  row: {
    minHeight: "200px",
    marginBottom: "160px",
  },
  block: {
    display: "inline-block",
    margin: "0 50px",
    minHeight: size,
    minWidth: size,
  },
  circle: {
    borderRadius: "50%",
    width: size,
    height: size,
    lineHeight: size,
    textAlign: "center",
    overflow: "hidden",
  },
};
