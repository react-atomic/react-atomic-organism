import React, { Component } from "react";

/**
 * Production please use
 * import ScrollAnimate from "organism-react-scroll-animate"
 */
import ScrollAnimate from "../organisms/ScrollAnimate"

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
    /*
    return (
          <BlackCircle
            key={6}
            once={false}
            enter="fadeOutRight-1000"
            id="last"
            isKeep={true}
          >
            6 Right (Keep)
          </BlackCircle>
    );
    */
    return (
      <div>
        <div style={Styles.row}>
          <BlackCircle key={0} once={false} enter="fadeInRight-1000">
            0 Right
          </BlackCircle>
          <WhiteCircle key={1} once={false} enter="fadeInLeft-1000">
            1 Left
          </WhiteCircle>
          <BlackCircle key={2} once={false} enter="fadeInUp-1000">
            2 Up
          </BlackCircle>
        </div>
        <div style={Styles.row}>
          <BlackCircle key={3} once={true} enter="fadeInLeft-1000">
            3 Left (once)
          </BlackCircle>
          <WhiteCircle key={4} once={false} enter="fadeInDown-1000">
            4 Down
          </WhiteCircle>
          <BlackCircle key={5} once={true} enter="fadeInRight-1000">
            5 Right (once)
          </BlackCircle>
        </div>
        <div style={Styles.row}>
          <BlackCircle
            key={6}
            once={false}
            enter="fadeOutRight-1000"
            id="last"
            isKeep={true}
          >
            6 Right (Keep)
          </BlackCircle>
          <WhiteCircle key={7} once={false} enter="fadeOutUp-1000">
            7 Up
          </WhiteCircle>
          <BlackCircle key={8} once={false} enter="fadeOutLeft-1000">
            8 Left
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
