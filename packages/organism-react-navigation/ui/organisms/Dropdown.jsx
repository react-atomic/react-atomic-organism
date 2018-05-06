import React, {cloneElement, isValidElement, PureComponent} from 'react'; 
import get from 'get-object-value';
import {
    reactStyle,
    mixClass,
    SemanticUI,
    Icon,
    Menu,
    Item
} from 'react-atomic-molecule';
import DropdownIcon from 'ricon/Dropdown';

class Dropdown extends PureComponent
{
    static defaultProps = {
        icon: true
    };

    timer = null;

    state = {
        listStyle: {},
        hideList: false
    };

    handleClick = () =>
    {
        this.setState({
            listStyle: {visibility: 'hidden'}
        });
        this.timer = setTimeout(()=>this.setState({
            listStyle: {visibility: 'inherit'}
        }), 500);
    }

    handleMenuClick = () =>
    {
        if (this.menu) {
            const doc = document;
            if (this.menu.contains(doc.activeElement)) {
                this.setState({
                    hideList: true 
                });
                setTimeout(()=>this.setState({
                    hideList: false 
                }));
            }
        }
    }

    componentWillUnmount()
    {
        if (this.timer) { 
            clearTimeout(this.timer);
        }
    }

    render()
    {
        const {list, listStyle, titleStyle, icon, children, style, className, ...props} = this.props;
        const {listStyle: stateListStyle, hideList} = this.state; 
        let thisList = null;
        if (!hideList) {
         thisList = cloneElement(
            list,
            {
                style: {
                    ...listStyle,
                    ...stateListStyle,
                    marginTop: -1, //aviod not expected hover out
                },
            }
         );
        }
        let thisIcon = null;
        if (icon) {
            if (!isValidElement(icon)) {
                reactStyle(
                    {
                        transform: ['rotate(180deg)']
                    },
                    '.ui.simple.dropdown:hover .dropdown-default-icon',
                    'dropdown-default-icon'
                );
                thisIcon = (
                    <Icon 
                        className="dropdown-default-icon"
                        style={Styles.icon}
                    >
                        <DropdownIcon />
                    </Icon>
                );
            } else {
                thisIcon = icon;
            }
        }
        const classes = mixClass(className, 'compact');
        return (
            <Menu
                {...props}
                style={{...Styles.container, ...style}}
                className={classes}
                onClick={this.handleMenuClick}
                refCb={el=>this.menu=el}
            >
                <Item
                    className="simple dropdown"
                    style={{...Styles.title, titleStyle}}
                >
                    <SemanticUI style={Styles.label} onClick={this.handleClick}>
                        {children}
                        {thisIcon}
                    </SemanticUI>
                    {thisList}
                </Item>
            </Menu>
        );
    }
}

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
    label: {
        display: 'inherit'
    },
    icon: {
        width: 24,
        height: 24,
        marginTop: -5
    }
};

