import React, {
    PureComponent,
    cloneElement,
    createElement,
    isValidElement
} from 'react';
import {
    mixClass,
    reactStyle,
    Icon,
    Rail,
    SemanticUI 
} from 'react-atomic-molecule';
import Hamburger from 'ricon/HamburgerToArrow';
import { connect } from 'reshow-flux';
import get from 'get-object-value';
import {hasClass, removeClass} from 'class-lib';

const getKeys = Object.keys;

import {
    navigationStore,
    navigationDispatch
} from '../../src/index';

const getMenuByArray = onClick => 
(arr, component, active) =>
{
    if (!arr) {
        return null;
    }
    const keys = getKeys(arr);
    let results = [];
    const build = (isValidElement(component)) ?
        cloneElement:
        createElement
        ;
    keys.forEach( key => {
         const {href, text, className, ...others} = arr[key];
         const classes = mixClass(
              className,
              'item',
              {
                  active: active === key
              }        
         );
         results.push(build(
            component,
            {
                ...others,
                key,
                href,
                name: key,
                className: classes,
                onClick,
            },
            text
         ));
    });
    return results;
}

const DefaultIcon = ({className, on, right, onClick, iconStyle, hamburgerStyle}) =>
<Icon
    onClick={onClick} 
    className={mixClass(className, 'hamburger-icon')}
    styles={
        reactStyle({
            ...Styles.icon,
            ...iconStyle,
        }, false, false)
    }
>
    <Hamburger on={on} right={right} styles={
        reactStyle({
            ...Styles.hamburger,
            ...hamburgerStyle,
        }, false, false)
    } />
</Icon>

class SideMenu extends PureComponent 
{
   static getStores()
   {
       return [navigationStore];
   }

   static calculateState(prevState, props)
   {
        let id = get(props, ['id'], 'default');
        const state = navigationStore.getState();
        let settings = state.get(id); 
        if (settings) {
            settings = settings.toJS();
        }
        return {
            on: get(settings, ['on']),
            activeMenu: get(settings, ['activeMenu'])
        };
   }

    static defaultProps = {
        component: SemanticUI,
        linkComponent: 'a',
        menus: [],
        root: null,
        rootActiveClass: 'side-menu-active',
        rootInactiveClass: 'side-menu-inactive',
    };

    getRoot()
    {
        const {root} = this.props;
        let thisRoot = root;
        if (!thisRoot) {
            thisRoot = document.body;
        }
        return thisRoot;
    }

    handleOn(stateOn)
    {
        const on = !(('undefined' !== typeof stateOn) ? stateOn : this.state.on);
        const {id, rootActiveClass, rootInactiveClass} = this.props; 
        navigationDispatch({
            id,
            params: { on }
        });
        const thisRoot = this.getRoot();
        if (on) {
            thisRoot.className = mixClass(thisRoot.className, rootActiveClass);
            thisRoot.className = removeClass(thisRoot.className, rootInactiveClass);
        } else {
            thisRoot.className = mixClass(thisRoot.className, rootInactiveClass);
            thisRoot.className = removeClass(thisRoot.className, rootActiveClass);
        }
    }

    componentWillUnmount()
    {
        const {rootActiveClass, rootInactiveClass} = this.props; 
        const thisRoot = this.getRoot();
        thisRoot.className = removeClass(thisRoot.className, rootActiveClass);
        thisRoot.className = removeClass(thisRoot.className, rootInactiveClass);
    }

    render()
    {
        const {
            defaultOnIcon,
            defaultOffIcon,
            iconStyle,
            hamburgerStyle,
            component,
            linkComponent,
            className,
            menus,
            root,
            rootActiveClass,
            rootInactiveClass,
            ...others
        } = this.props;
        const {
            activeMenu,
            on
        } = this.state;
        const menuItems = getMenuByArray(this.handleOn.bind(this))(
            menus,
            linkComponent,
            activeMenu
        );
        const build = (isValidElement(component)) ?
            cloneElement:
            createElement
            ;
        const menuElement =  build(
            component,
            others,
            menuItems    
        );
        let defaultOn = on;
        let defaultOff = on;
        if (!on && false !== on) {
            defaultOn = true;
            defaultOff = false;
        }
        let thisDefaultOnIcon = defaultOnIcon;
        let thisDefaultOffIcon = defaultOffIcon;
        if (!thisDefaultOnIcon) {
            thisDefaultOnIcon = <DefaultIcon />;
        }
        if (!thisDefaultOffIcon) {
            thisDefaultOffIcon = <DefaultIcon />;
        }
        thisDefaultOnIcon = cloneElement(
            thisDefaultOnIcon,
            {
                on: true,
                right: !defaultOn,
                onClick: this.handleOn.bind(this, defaultOn),
                className: 'default-on',
                iconStyle,
                hamburgerStyle
            }
        );
        thisDefaultOffIcon = cloneElement(
            thisDefaultOffIcon,
            {
                on: defaultOff,
                onClick: this.handleOn.bind(this, defaultOff),
                className: 'default-off',
                iconStyle,
                hamburgerStyle
            }
        );
        const classes = mixClass(
              {
                  active: on, 
                  inactive: on === false, 
              },        
              className, 
        );
        return (
            <Rail className={classes}>
                {menuElement}
                {thisDefaultOnIcon}
                {thisDefaultOffIcon}
            </Rail>
        );
    }
}

export default connect(
    SideMenu,
    { withProps:true }    
);

const Styles = {
    icon: {
        background: "#000",
        padding: 5,
        width: 24,
        height: 24,
        position: 'fixed',
        top: 0,
        left: 0,
        zIndex: 1,
        cursor: 'pointer',
        opacity: '.5',
        transition: ['all 0.2s ease-out']
    },
    hamburger: {
        fill: "#fff"
    }
};
