import React, {
  forwardRef,
  useImperativeHandle,
  useState,
  useEffect,
  useRef,
  Children,
} from "react";
import { mixClass, build, SemanticUI } from "react-atomic-molecule";

const handleTabPress = ({
  disableSwitch,
  nodeKey,
  nodeProps,
  setLastSelected,
  thisSelected,
  onTabItemPress,
}) => (e) => {
  if (!disableSwitch) {
    if (!nodeProps.disableSwitch) {
      setLastSelected(nodeKey);
      thisSelected.current = nodeKey;
    }
  }
  if (onTabItemPress) {
    onTabItemPress(thisSelected.current, nodeKey);
  }
};

const handleSelected = ({
  children,
  lastSelected,
  setLastSelected,
  thisSelected,
  disableSwitch,
  onTabItemPress,
}) => {
  const tabMenuItems = [];
  let contentView = null;
  Children.map(children, (item, itemKey) => {
    const itemProps = item.props;
    // Detect selected
    const nodeKey = itemProps.name || itemKey;
    if (true === lastSelected) {
      lastSelected = nodeKey;
    }
    thisSelected.current = lastSelected;
    const isActived = nodeKey === lastSelected;
    Children.map(itemProps.children, (node, index) => {
      if (index % 2 || 1 === Children.count(itemProps.children)) {
        const nodeProps = node.props;
        const nodeClasses = mixClass(nodeProps.className, "item", {
          active: isActived,
        });
        node = build(node)({
          key: nodeKey,
          "data-selected": isActived,
          className: nodeClasses,
          style: { ...Styles.tabItem, ...nodeProps.style },
          onClickCapture: handleTabPress({
            disableSwitch,
            nodeKey,
            nodeProps,
            setLastSelected,
            thisSelected,
            onTabItemPress,
          }),
        });
        tabMenuItems.push(node);
      } else {
        if (isActived) {
          contentView = node;
        }
      }
    });
  });
  return {
    lastSelected,
    contentView,
    tabMenuItems,
  };
};

const TabView = forwardRef((props, ref) => {
  const {
    id,
    style,
    selected: propsSelected,
    children,
    contentStyle,
    menuStyle,
    menu,
    body,
    disableSwitch,
    rwd,
    leftMenu,
    rightMenu,
    bottom,
    left,
    right,
    onTabItemPress,
  } = props;
  const [lastSelected, setLastSelected] = useState();
  const lastPropsSelected = useRef();
  const thisSelected = useRef();
  useImperativeHandle(ref, () => ({
    getSelected: () => thisSelected.current,
  }));
  useEffect(() => {
    if (propsSelected !== lastPropsSelected.current) {
      lastPropsSelected.current = propsSelected;
      setLastSelected(propsSelected);
    }
  }, [propsSelected]);
  const { contentView, tabMenuItems } = handleSelected({
    children,
    lastSelected,
    thisSelected,
    setLastSelected,
    disableSwitch,
    onTabItemPress,
  });
  // Tab Menu
  if (leftMenu) {
    tabMenuItems.push(build(leftMenu)({ key: "l-menu" }));
  }
  if (rightMenu) {
    tabMenuItems.push(build(rightMenu)({ key: "r-menu" }));
  }
  const menuOpt = {
    top: !bottom && !left && !right,
    bottom,
    vertical: left || right,
    stackable: rwd,
  };
  const menuClasses = mixClass("attached tabular menu", menuOpt);
  const tabMenu = build(menu)(
    {
      key: "menu",
      style: menuStyle,
      className: menuClasses,
    },
    tabMenuItems
  );
  let content;
  if (contentView) {
    // Tab Body
    const contentClasses = mixClass("attached tab segment active", {
      top: !menuOpt.top,
      bottom: menuOpt.top,
    });
    content = build(body)(
      {
        key: "content",
        style: { ...Styles.tabBody, ...contentStyle },
        className: contentClasses,
      },
      contentView
    );
  }
  const childOrder = menuOpt.top ? [tabMenu, content] : [content, tabMenu];
  return (
    <SemanticUI style={style} id={id} className="tab-view">
      {childOrder}
    </SemanticUI>
  );
});

TabView.defaultProps = {
  disableSwitch: false,
  rwd: true,
  selected: true,
  body: SemanticUI,
  menu: SemanticUI,
};

TabView.displayName = "TabView";

export default TabView;

const Styles = {
  tabBody: {
    boxSizing: "border-box",
  },
  tabItem: {
    boxSizing: "border-box",
    cursor: "pointer",
  },
};
