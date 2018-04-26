import React, {cloneElement, isValidElement} from 'react'; 
import get from 'get-object-value';
import {
    mixClass,
    Icon,
    Menu,
    Item
} from 'react-atomic-molecule';
import DropdownIcon from 'ricon/Dropdown';

const Dropdown = ({list, listStyle, titleStyle, icon, children, style, className, ...props}) =>
{
    list = cloneElement(
        list,
        {
            style: {
                ...listStyle,
                marginTop: -10, //aviod not expected hover out
            }
        }
    );
    if (icon) {
        if (!isValidElement(icon)) {
            icon = <Icon style={Styles.icon}><DropdownIcon /></Icon>;
        }
    } else {
        icon = null;
    }
    const classes = mixClass(className, 'compact');
    return (
        <Menu {...props} style={{...Styles.container, ...style}} className={classes}>
            <Item className="simple dropdown" style={{...Styles.title, titleStyle}}>
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
        minHeight: 'auto',
        background: 'none',
    },
    title: {
        padding: 0
    },
    icon: {
        width: 24,
        height: 24
    }
};

