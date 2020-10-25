import React from "react";

const Bar = (props) => (
  <div style={Styles.bar}>
    <ActionButtons />
    <URL />
  </div>
);

const Button = (props) => (
  <div
    style={{
      width: props.size + "px",
      height: props.size + "px",
      borderRadius: props.size + "px",
      marginLeft: props.size + "px",
      ...Styles.button,
      ...props.style,
    }}
  />
);

Button.defaultProps = {
  size: 10,
};

const ActionButtons = () => (
  <div style={Styles.buttons}>
    <Button />
    <Button style={{ background: "#fcae52" }} />
    <Button style={{ background: "#66b34e" }} />
  </div>
);

const URL = (props) => <div style={Styles.url} />;

const Browser = (props) => {
  const { children, style, ...others } = props;
  return (
    <div {...others} style={{ ...Styles.container, ...style }}>
      <Bar />
      <div style={Styles.children}>{children}</div>
    </div>
  );
};

export default Browser;

const Styles = {
  container: {
    minWidth: 240,
    minHeight: 180,
    background: "#fff",
    border: "2px solid #f1f1f1",
    borderTop: "30px solid #eee",
    borderRadius: "10px",
    position: "relative",
  },
  children: {
    overflow: "hidden",
    borderRadius: "10px",
  },
  bar: {
    position: "absolute",
    top: "-22px",
    width: "100%",
  },
  buttons: {
    position: "relative",
    textAlign: "left",
  },
  button: {
    display: "inline-block",
    background: "#fc5254",
  },
  url: {
    position: "absolute",
    background: "#fff",
    borderRadius: "3px",
    height: 13,
    top: 0,
    left: 80,
    right: 10,
    border: "1px solid #ececec",
  },
};
