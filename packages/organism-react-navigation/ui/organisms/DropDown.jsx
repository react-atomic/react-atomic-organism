import React, {cloneElement} from 'react'; 
import get from 'get-object-value';
import {
    Icon,
    Menu,
    Item
} from 'react-atomic-molecule';
import DropDownIcon from 'ricon/DropDown';

const DropDown = ({list, children, ...props}) =>
{
    const listStyle = get(list, ['props', 'style']);
    list = cloneElement(
        list,
        {
            style: {
                ...listStyle,
                marginTop: -10, //aviod not expected hover out
            }
        }
    );
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

