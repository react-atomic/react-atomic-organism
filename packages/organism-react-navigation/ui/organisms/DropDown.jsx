import React from 'react'; 

import {
    Icon,
    Menu,
    Item
} from 'react-atomic-molecule';

import DropDownIcon from 'ricon/DropDown';

const DropDown = (props) =>
{
    const {list, children } = props;
    return (
        <Menu style={Styles.container} className="compact">
            <Item style={Styles.tip} className="simple dropdown">
                {children} 
                <Icon style={Styles.icon}><DropDownIcon /></Icon>
                {list}
            </Item>
        </Menu>
    );
}
export default DropDown;

const Styles = {
    container: {
        border:'none',
        boxShadow: 'none',
        minHeight: 'auto'
    },
    tip: {
        padding: 5 
    },
    icon: {
        width: 24,
        height: 24
    }
};

