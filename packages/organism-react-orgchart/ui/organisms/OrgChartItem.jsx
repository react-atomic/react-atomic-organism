import React, { Component } from "react";
import { mixClass, reactStyle, Card, Item } from "react-atomic-molecule";

const Styles = {
  item: reactStyle({
    display: "inline-block",
    margin: 0,
    width: "100px",
  }),
  li: reactStyle({
    float: "left",
    textAlign: "center",
    listStyleType: "none",
    padding: "20px 5px 0 5px",
    transition: ["all 0.5s"],
    position: "relative",
  }),
};

export default class OrganizationChart extends Component {
  render() {
    return (
      <Item {...this.props} styles={Styles.li} ui={false}>
        <Card
          atom="a"
          className={this.props.className}
          styleOrder="1"
          styles={Styles.item}
        >
          {this.props.content}
        </Card>
        {this.props.children}
      </Item>
    );
  }
}
