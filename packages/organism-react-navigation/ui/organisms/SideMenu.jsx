import React, {Component} from 'react';
import { mixClass, reactStyle, Icon, Rail, SemanticUI } from 'react-atomic-molecule';
import { ReLink } from 'reshow';
import Hamburger from 'ricon/HamburgerToArrow';
const getKeys = Object.keys;

const getMenuByArray = (arr, active) =>
{
    const keys = getKeys(arr);
    let results = [];
    keys.forEach((key, k)=>{
         const classes = mixClass(
              'item',
              {
                  active: active === key
              }        
         );
         results.push((
             <ReLink
                className={classes}
                key={k}
                href={arr[key].href}
             >
                {arr[key].text}
             </ReLink>
         ));
    });
    return results;
}

const toggleClass = (el, className) =>
{
    let classes = el.className.split(/\s+/);
    const len = classes.length;
    classes.every((c, i)=>{
        if (classes[i] === className) {
            classes.splice(i, 1);
            return false;
        } else {
            return true;
        }
    });
    if (len === classes.length) {
        classes.push(className);
    }
    el.className = classes.join(' ');
};

class SideMenu extends Component 
{
    static defaultProps = {
        component: SemanticUI,
        menus: {},
        type: 'array',
        active: null,
    };

    handleOn = ()=>{
        this.setState({
            on: !this.state.on
        });
        toggleClass(document.body, 'side-menu-active');
    }

    constructor(props)
    {
        super(props);
        this.state = {
            on: false
        };
    }

    render()
    {
        const {
            component,
            menus,
            type,
            active,
            on,
            className,
            ...others
        } = this.props;
         const classes = mixClass(
              className, 
              {
                  active: this.state.on 
              }        
         );
        let menuItems;
        if ('array'===type) {
            menuItems = getMenuByArray(
                menus,
                active
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
        return (
            <Rail className={classes}>
                {menuElement}
                <Icon 
                    onClick={this.handleOn} 
                    className="hamburger-icon"
                    style={Styles.icon}
                    styles={reactStyle({
                        transition: ['all 0.2s ease-out']
                    },null,false)}
                >
                    <Hamburger style={Styles.hamburger} on={this.state.on}/>
                </Icon>
            </Rail>
        );
    }
}

export default SideMenu;

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
