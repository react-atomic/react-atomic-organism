import React, {PureComponent} from 'react';
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
import {hasClass,  removeClass} from 'class-lib';

const getKeys = Object.keys;

import {
    navigationStore,
    navigationDispatch
} from '../../src/index';

const getMenuByArray = (arr, component, active) =>
{
    if (!arr) {
        return null;
    }
    const keys = getKeys(arr);
    let results = [];
    let build;
    if (React.isValidElement(component)) {
        build = React.cloneElement;
    } else {
        build = React.createElement;
    }
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
            },
            text
         ));
    });
    return results;
}

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
        type: 'array',
        root: null,
        rootActiveClass: 'side-menu-active'
    };

    handleOn = ()=>{
        let on = !this.state.on;
        navigationDispatch({
            id: this.props.id,
            params: {
                on: on 
            }
        });
        let root = this.props.root;
        if (!root) {
            root = document.body;
        }
        if (on) {
            root.className = mixClass(root.className, this.props.rootActiveClass);
        } else {
            root.className = removeClass(root.className, this.props.rootActiveClass);
        }
    }
    

    render()
    {
        const {
            icon,
            iconStyle,
            hamburgerStyle,
            component,
            linkComponent,
            className,
            type,
            menus,
            root,
            rootActiveClass,
            ...others
        } = this.props;
        const {
            activeMenu,
            on
        } = this.state;
        let menuItems;
        if ('array'===type) {
            menuItems = getMenuByArray(
                menus,
                linkComponent,
                activeMenu
            );
        }
        let build;
        if (React.isValidElement(component)) {
            build = React.cloneElement;
        } else {
            build = React.createElement;
        }
        const menuElement =  build(
            component,
            others,
            menuItems    
        );
        let thisIcon = icon;
        if (!thisIcon) {
            thisIcon = (
                <Icon
                    onClick={this.handleOn} 
                    className="hamburger-icon"
                    styles={
                        reactStyle({
                            ...Styles.icon,
                            ...iconStyle,
                        }, false, false)
                    }
                >
                    <Hamburger on={on} styles={
                        reactStyle({
                            ...Styles.hamburger,
                            ...hamburgerStyle,
                        }, false, false)
                    } />
                </Icon>
            );
        }
        const classes = mixClass(
              {
                  active: on 
              },        
              className, 
        );
        return (
            <Rail className={classes}>
                {menuElement}
                {thisIcon}
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
