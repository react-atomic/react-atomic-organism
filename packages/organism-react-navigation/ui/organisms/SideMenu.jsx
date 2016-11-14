import React, {Component} from 'react';
import {
    assign,
    mixClass,
    reactStyle,
    Icon,
    Rail,
    SemanticUI 
} from 'react-atomic-molecule';
import Hamburger from 'ricon/HamburgerToArrow';
import { Container } from 'reduce-flux';
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
    keys.forEach((key, k)=>{
         const classes = mixClass(
              'item',
              {
                  active: active === key
              }        
         );
         results.push(build(
            component,
            {
                className: classes,
                key: k,
                href: arr[key].href
            },
            arr[key].text
         ));
    });
    return results;
}

class SideMenu extends Component 
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
        id: null,
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
        const classes = mixClass(
              {
                  active: on 
              },        
              className, 
              component.props.className,
        );
        let buildProps = assign(
            others,
            {
                className: classes
            }
        );
        if (!buildProps.id) {
            delete buildProps.id;
        }
        const menuElement =  build(
            component,
            buildProps,
            menuItems    
        );
        return (
            <Rail>
                {menuElement}
                <Icon 
                    onClick={this.handleOn} 
                    className="hamburger-icon"
                    style={Styles.icon}
                    styles={reactStyle({
                        transition: ['all 0.2s ease-out']
                    },null,false)}
                >
                    <Hamburger style={Styles.hamburger} on={on}/>
                </Icon>
            </Rail>
        );
    }
}

const SideMenuContainer = Container.create(
    SideMenu,
    { withProps:true }    
);
export default SideMenuContainer;

const Styles = {
    icon: {
        background: "#000",
        padding: 5,
        width: 24,
        height: 24,
        position: 'fixed',
        top: 0,
        left: 0,
        zIndex:1,
        cursor: 'pointer'
    },
    hamburger: {
        fill: "#fff"
    }
};
