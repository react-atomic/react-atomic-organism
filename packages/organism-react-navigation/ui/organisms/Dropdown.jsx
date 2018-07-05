import React, {cloneElement, isValidElement, PureComponent} from 'react'; 
import get from 'get-object-value';
import {
    lazyInject,
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
    }

    timer = null;

    state = {
        listStyle: {},
        hideList: false,
    }

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
            this.setState({
                hideList: true 
            });
            setTimeout(()=>this.setState({
                hideList: false 
            }));
        }
    }

    constructor(props)
    {
        super(props)
        injects = lazyInject( injects, InjectStyles )
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
        if (!hideList && list) {
         thisList = cloneElement(
            list,
            {
                style: {
                    ...listStyle,
                    ...stateListStyle,
                    marginTop: -1, //aviod not expected hover out
                },
                onClick: this.handleMenuClick
            }
         );
        }
        let thisIcon = null;
        if (icon) {
            if (!isValidElement(icon)) {
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
                    style={{...Styles.title, ...titleStyle}}
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

let injects;
const InjectStyles = {
    defaultIcon: [
        {
            transform: ['rotate(180deg)']
        },
        '.ui.simple.dropdown:hover .dropdown-default-icon',
    ],
    initMenu: [
        {
            display: 'none !important'
        },
        '.ui.simple.dropdown .menu'
    ],
    hoverMenu: [
        {
            display: 'block !important'
        },
        [
            '.ui.simple.active.dropdown>.menu',
            '.ui.simple.dropdown:hover>.menu'
        ].join(',')
    ]
}
