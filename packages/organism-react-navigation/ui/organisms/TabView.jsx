import React, {
  forwardRef,
  useImperativeHandle,
  useState,
  useEffect,
  useRef,
  Children,
} from "react";
import { mixClass, build, useCSS, SemanticUI } from "react-atomic-molecule";
import callfunc from "call-func";

const handleTabPress =
  ({
    disableSwitch,
    nodeKey,
    nodeProps,
    setLastSelected,
    thisSelected,
    onTabItemPress,
    onTabItemWillPress,
  }) =>
  (e) => {
    const isContinue =
      false !==
      callfunc(onTabItemWillPress, [
        {
          nodeKey,
          selected: thisSelected.current,
        },
      ]);
    if (!disableSwitch && isContinue) {
      if (!nodeProps.disableSwitch) {
        setLastSelected(nodeKey);
        thisSelected.current = nodeKey;
      }
    }
    e.selected = thisSelected.current;
    e.nodeKey = nodeKey;
    callfunc(onTabItemPress, [thisSelected.current, e]);
  };

const handleSelected = ({
  children,
  nextSelect,
  setLastSelected,
  thisSelected,
  disableSwitch,
  onTabItemWillPress,
  onTabItemPress,
}) => {
  const tabMenuItems = [];
  let contentView = null;
  let hasSelected = false;
  Children.map(children, (item, itemKey) => {
    const itemProps = item.props;
    // Detect selected
    const nodeKey = "name" in itemProps ? itemProps.name : itemKey;
    if (true === nextSelect) {
      nextSelect = nodeKey;
    }
    thisSelected.current = nextSelect;
    const isActived = nodeKey === nextSelect;
    if (isActived && !hasSelected) {
      hasSelected = true;
    }
    Children.map(itemProps.children, (node, index) => {
      if (index % 2 || 1 === Children.count(itemProps.children)) {
        const nodeProps = node?.props || {};
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
            onTabItemWillPress,
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
    hasSelected,
    contentView,
    tabMenuItems,
  };
};

const useTabView = (props) => {
  const {
    disableSwitch = false,
    rwd = true,
    selected: propsSelected = true,
    menu = SemanticUI,
    body = SemanticUI,
    id,
    style,
    children,
    contentStyle,
    menuStyle,
    leftMenu,
    rightMenu,
    bottom,
    left,
    right,
    onTabItemWillPress,
    onTabItemPress,
    onChange,
  } = props;
  useCSS(["tab"], "semantic");
  const [lastSelected, setHookLastSelected] = useState({
    current: propsSelected,
  });
  const lastPropsSelected = useRef();
  const thisSelected = useRef();

  const setLastSelected = (val) =>
    setHookLastSelected(({ prev, current }) => ({
      prev: current,
      current: val,
    }));

  useEffect(() => {
    if (propsSelected !== lastPropsSelected.current) {
      lastPropsSelected.current = propsSelected;
      setLastSelected(propsSelected);
    }
  }, [propsSelected]);

  useEffect(() => {
    if (lastSelected.prev !== lastSelected.current) {
      thisSelected.current = lastSelected.current;
      setTimeout(() => {
        callfunc(onChange, [
          thisSelected.current,
          { selected: thisSelected.current },
        ]);
      });
    }
  }, [lastSelected]);
  let selectResult = handleSelected({
    nextSelect: lastSelected.current,
    children,
    thisSelected,
    setLastSelected,
    disableSwitch,
    onTabItemWillPress,
    onTabItemPress,
  });
  if (!selectResult.hasSelected && propsSelected !== false) {
    selectResult = handleSelected({
      nextSelect: true,
      children,
      thisSelected,
      setLastSelected,
      disableSwitch,
      onTabItemWillPress,
      onTabItemPress,
    });
    if (selectResult.hasSelected) {
      setTimeout(() => setLastSelected(thisSelected.current));
    }
  }
  const { contentView, tabMenuItems } = selectResult;
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

  const expose = {
    getSelected: () => thisSelected.current,
  };

  return {
    contentView,
    tabMenuItems,
    menuOpt,
    menuStyle,
    menu,
    body,
    contentStyle,
    expose,
    id,
    style,
  };
};

const TabView = forwardRef((props, ref) => {
  const {
    contentView,
    tabMenuItems,
    menuOpt,
    menuStyle,
    menu,
    body,
    contentStyle,
    expose,
    id,
    style,
  } = useTabView(props);

  useImperativeHandle(ref, () => expose, []);

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
