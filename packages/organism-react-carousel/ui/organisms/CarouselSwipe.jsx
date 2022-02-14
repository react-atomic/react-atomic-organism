import React, { Component } from "react";
import { mixClass, SemanticUI, List } from "react-atomic-molecule";

class CarouselSwipe extends Component {
  dragging = false;
  startX = null;

  getX(e) {
    const posX = e.touches !== undefined ? e.touches[0].pageX : e.clientX;
    return posX;
  }

  swipeStart = (e) => {
    this.dragging = true;
    this.startX = this.getX(e);
  };

  swipeMove = (e) => {
    if (!this.dragging) {
      return false;
    }
    const posX = this.getX(e);
    const move = this.startX - posX;
  };

  swipeEnd = (e) => {};

  componentDidMount() {
    const { onHeight } = this.props;
    if (onHeight) {
      setTimeout(() => {
        const height = this.el.offsetHeight;
        onHeight(height);
      }, 700);
    }
  }

  render() {
    const { onHeight, className, ...others } = this.props;
    return (
      <SemanticUI style={Styles.container}>
        <List
          className={mixClass("carousel-swipe", className)}
          style={Styles.inside}
          {...others}
          refCb={(el) => (this.el = el)}
          onMouseDown={this.swipeStart}
          onMouseMove={this.swipeMove}
          onMouseUp={this.swipeEnd}
          onMouseLeave={this.swipeMove}
          onTouchStart={this.swipeStart}
          onTouchMove={this.swipeMove}
          onTouchEnd={this.swipeEnd}
          onTouchCancel={this.swipeMove}
        />
      </SemanticUI>
    );
  }
}

export default CarouselSwipe;

const Styles = {
  container: {
    overflowX: "scroll",
    overflowY: "hidden",
    position: "relative",
    paddingBottom: 5,
    fontSize: "1rem",
  },
  inside: {
    display: "inline-block",
    position: "relative",
    whiteSpace: "nowrap",
    overflow: "hidden",
  },
};
