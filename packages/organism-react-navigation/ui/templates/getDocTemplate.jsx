import {
  build,
  min,
  mixClass,
  mergeStyleConfig,
  useLazyInject,
  Segment,
  SemanticUI,
} from "react-atomic-molecule";
import get from "get-object-value";

let injects;

const getDocTemplate = (params, Styles = {}, merge = true) => {
  /* Defined containerClass */
  let sideWidth = get(params, ["sideWidth"], 300);
  const miniSidebarWidth = get(params, ["miniSidebarWidth"], 42);
  const rightWidth = get(params, ["rightWidth"], 0); // use in three column layout, (Right col)
  const containerClass = `width-${sideWidth}-${miniSidebarWidth}-${rightWidth}`;
  const active = get(params, ["active"]);
  const docId = get(params, ["docId"], "doc");
  const menuId = get(params, ["menuId"], "doc-menu");

  const miniSidebar = get(params, ["miniSidebar"]);
  const fixedMini = get(params, ["fixedMini"]);
  const getMiniClass = (tpl, alwaysOn = fixedMini) => {
    const c = [tpl.replace("[active]", "inactive")];
    if (alwaysOn) {
      c.push(tpl.replace("[active]", "active"));
    }
    return c.join(", ");
  };

  let initSideWidth = fixedMini ? miniSidebarWidth : active ? sideWidth : 0;
  if (initSideWidth && !isNaN(initSideWidth)) {
    initSideWidth += "px";
  }
  if (sideWidth && !isNaN(sideWidth)) {
    sideWidth += "px";
  }
  let InjectStyles = {
    /*default*/
    defaultOnIcon: [
      {
        display: "none",
      },
      ".ui.rail>.hamburger-icon.default-on",
    ],
    defaultOnIconSvg: [
      {
        display: "block",
      },
      ".ui.rail>.hamburger-icon svg",
    ],
    rail: [
      {
        width: 0,
        overflow: "hidden",
      },
      `.ui.rail.left, #${menuId}`,
    ],

    /**
     * RWD
     */
    mdContainer: [
      {
        padding: "0 " + rightWidth + "px 0 " + initSideWidth + " !important",
      },
      [min.md, "#" + docId],
    ],
    mdMenu: [
      {
        width: sideWidth + " !important",
      },
      [
        min.md,
        [".ui.rail.left", `#${menuId}`, `#${menuId} .ui.vertical.menu`].join(
          ","
        ),
      ],
    ],
    mdIconDefaultOff: [
      {
        display: "none !important",
      },
      [min.md, ".ui.rail>.hamburger-icon.default-off"],
    ],
    mdIconDefaultOn: [
      {
        left: sideWidth + " !important",
        display: "block !important",
      },
      [min.md, ".ui.rail>.hamburger-icon.default-on"],
    ],
    mdInactiveContainer: [
      {
        padding: "0 !important",
      },
      [min.md, getMiniClass(`.side-menu-[active] #${docId}`)],
    ],
    mdInactiveMenu: [
      {
        maxWidth: 0,
        overflowY: "hidden !important",
      },
      [min.md, getMiniClass(`.[active] #${menuId}`)],
    ],
    mdInactiveIconDefaultOn: [
      {
        left: 1 + "px !important",
      },
      [min.md, getMiniClass(".ui.rail.[active]>.hamburger-icon.default-on")],
    ],

    /* Active */
    activeContainer: [
      {
        padding: "0 " + rightWidth + "px 0 " + sideWidth + " !important",
        overflow: "hidden",
      },
      `.side-menu-active #${docId}`,
    ],
    activeMenu: [
      {
        width: sideWidth + " !important",
      },
      [
        `.active.ui > #${menuId}`,
        ".active.ui.rail.left",
        ".active.ui.rail.left .ui.vertical.menu",
      ].join(","),
    ],
    activeIcon: [
      {
        left: sideWidth + " !important",
      },
      `.active > #${menuId} ~ .hamburger-icon`,
    ],
  };

  if (miniSidebar) {
    InjectStyles = {
      ...InjectStyles,
      /* RWD Inactive */
      mdInactiveContainer: [
        {
          padding: "0 0 0 " + miniSidebarWidth + "px !important",
        },
        [min.md, getMiniClass(`.side-menu-[active] #${docId}`)],
      ],
      mdRailInactive: [
        {
          maxWidth: miniSidebarWidth,
        },
        [min.md, getMiniClass(`#${docId} > .ui.rail.[active]`)],
      ],
      mdInactiveMenu: [
        {
          maxWidth: miniSidebarWidth,
          overflowY: "hidden !important",
        },
        [min.md, getMiniClass(`.[active] #${menuId}`)],
      ],
      mdInactiveMenuLink: [
        {
          padding: "5px 0 !important",
        },
        [min.md, getMiniClass(`.[active] #${menuId} .item > a`)],
      ],
      mdInactiveSubMenu: [
        {
          display: "none !important",
        },
        [min.md, getMiniClass(`.[active] #${menuId} .item > .menu`)],
      ],
      mdInactiveHover: [
        {
          overflow: "visible !important",
        },
        [min.md, getMiniClass(`.[active] #${menuId}:hover`)],
      ],
      mdInactiveItemHover: [
        {
          display: "block !important",
          position: "absolute",
          minWidth: 224,
          maxHeight: "50vh",
          overflow: "auto",
          top: 0,
          left: miniSidebarWidth,
          background: "#fff",
          borderRadius: 5,
          border: "1px solid #eee",
        },
        [min.md, getMiniClass(`.[active] #${menuId} .item:hover > .menu`)],
      ],
      mdInactiveIconDefaultOn: [
        {
          left: miniSidebarWidth + 1 + "px !important",
        },
        [min.md, getMiniClass(".ui.rail.[active]>.hamburger-icon.default-on")],
      ],
    };

    if (fixedMini) {
      InjectStyles = {
        ...InjectStyles,
        mdVerticalMenu: [
          {
            overflowY: "scroll",
            overflowX: "hidden",
            maxHeight: "100vh",
          },
          `#${menuId} .ui.vertical.menu`,
        ],
        mdInactiveHover: [
          {
            overflow: "hidden !important",
          },
          getMiniClass(`.[active] #${menuId}:hover`),
        ],
        mdInactiveMenu: [
          {
            maxWidth: miniSidebarWidth,
            overflowY: "hidden !important",
          },
          getMiniClass(`.[active] #${menuId}`),
        ],
        activeIcon: [
          {
            left: miniSidebarWidth + "px !important",
          },
          `.active > #${menuId} ~ .hamburger-icon`,
        ],
      };
    }
  }

  if (merge) {
    mergeStyleConfig(Styles, defaultStyles, InjectStyles);
  }

  const DocTemplate = ({
    className,
    menu,
    right,
    body,
    footer,
    style,
    ...others
  }) => {
    injects = useLazyInject(InjectStyles, injects);
    return (
      <SemanticUI
        {...others}
        className={mixClass(className, containerClass)}
        style={{ ...Styles.container, ...style }}
      >
        <SemanticUI className="doc-body" style={Styles.docBody}>
          {body && build(body)()}
          {footer && build(footer)()}
        </SemanticUI>
        {menu && build(menu)()}
        {right && build(right)()}
      </SemanticUI>
    );
  };

  DocTemplate.defaultProps = {
    className: "basic",
    id: docId,
  };

  return DocTemplate;
};

const defaultStyles = {
  container: {
    margin: 0,
  },
  docBody: {
    minWidth: 350,
  },
};

export default getDocTemplate;
