import React, { PureComponent } from "react";
import { mixClass, Dimmer } from "react-atomic-molecule";
import { CardView } from "../../src/index";

class HoverDimmerCardView extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      show: false,
    };
  }

  handleHover = () => {
    this.setState({ show: true });
  };

  handleLeave = () => {
    this.setState({ show: false });
  };

  render() {
    const { children, className, style, ...others } = this.props;
    const { show } = this.state;
    let dimmer;
    const newStyle = { ...style };
    if (show) {
      dimmer = <Dimmer show={true}>{children}</Dimmer>;
      newStyle.cursor = "pointer";
    }
    const classes = mixClass(className, {
      "blurring dimmable dimmed": show,
    });
    return (
      <CardView
        {...others}
        className={classes}
        style={newStyle}
        onMouseOver={this.handleHover}
        onMouseLeave={this.handleLeave}
        dimmer={dimmer}
      />
    );
  }
}

export default HoverDimmerCardView;
