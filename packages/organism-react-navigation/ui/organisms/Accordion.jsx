import React, { PureComponent } from "react";
import {
  mixClass,
  Icon,
  SemanticUI,
  Item,
  Title,
  Content,
} from "react-atomic-molecule";
import get from "get-object-value";
import Dropdown from "ricon/Dropdown";

const AccordionItem = ({
  title,
  content,
  iconLeft,
  iconRight,
  titleClasses,
  contentClasses,
  onClick,
}) => (
  <Item>
    <Title {...{ onClick, className: titleClasses }}>
      {iconLeft}
      {title}
      {iconRight}
    </Title>
    <Content className={contentClasses}>{content}</Content>
  </Item>
);

class Accordion extends PureComponent {
  static defaultProps = {
    iconOpen: <Dropdown />,
    iconClose: <Dropdown type="left" />,
    iconLocRight: true,
    iconLocLeft: false,
  };

  state = {
    isActives: {},
  };

  handleClick(name) {
    this.setState(({ isActives }) => {
      isActives[name] = !get(isActives, [name], false);
      return { ...isActives };
    });
  }

  render() {
    const {
      className,
      items,
      iconLocRight,
      iconLocLeft,
      iconOpen,
      iconClose,
    } = this.props;
    const { isActives } = this.state;
    const classes = mixClass("accordion", className);
    return (
      <SemanticUI className={classes}>
        {items.map((item, key) => {
          const itemProps = get(item, ["props"], {});
          const name = itemProps.name || key;
          const isActive = !!isActives[name];
          const titleClasses = mixClass({
            active: isActive,
          });
          const contentClasses = mixClass({
            active: isActive,
          });
          const icon = (
            <Icon style={Styles.icon}>{isActive ? iconOpen : iconClose}</Icon>
          );
          let iconLeft;
          let iconRight;
          if (iconLocRight) {
            iconRight = icon;
          } else if (iconLocLeft) {
            iconLeft = icon;
          }
          return (
            <AccordionItem
              {...{
                ...item,
                name,
                titleClasses,
                contentClasses,
                iconLeft,
                iconRight,
                key: name,
                onClick: this.handleClick.bind(this, name),
              }}
            />
          );
        })}
      </SemanticUI>
    );
  }
}

export default Accordion;

const Styles = {
  icon: {
    width: 24,
    height: 24,
  },
};
