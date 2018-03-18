import React, {cloneElement, isValidElement} from 'react'; 
import get from 'get-object-value';
import {
    Icon,
    Menu,
    Item
} from 'react-atomic-molecule';
import DropdownIcon from 'ricon/Dropdown';

const Dropdown = ({list, icon, children, ...props}) =>
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
    if (icon && !isValidElement) {
        icon = <Icon style={Styles.icon}><DropdownIcon /></Icon>;
    } else {
        icon = null;
    }
    return (
        <Menu style={Styles.container} className="compact">
            <Item className="simple dropdown">
                {children} 
                {icon}
                {list}
            </Item>
        </Menu>
    );
}

Dropdown.defaultProps = {
    icon: true
};

export default Dropdown;

const Styles = {
    container: {
        border:'none',
        boxShadow: 'none',
        minHeight: 'auto'
    },
    icon: {
        width: 24,
        height: 24
    }
};

