import React, {Component} from 'react';
import { 
    mixClass,
    reactStyle,
    Icon,
    SemanticUI
} from 'react-atomic-molecule';
import HamburgerIcon from 'ricon/HamburgerToX';

class HorizontalToVerticalMenu extends Component
{
    static defaultProps = {
        component: SemanticUI,
        brand: null,
        nav: null,
    };

    handleOn = ()=>
    {
        this.setState({
            on: !this.state.on
        });
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
            brand,
            component,
            getStyle,
            nav,
            style,
            className,
            ...others
        } = this.props;
        const classes = mixClass(
            'pure-g',
            className,
            {
                active: this.state.on
            }
        );
        let thisChildren = [];
        let build;
        const clone = React.cloneElement;
        if (React.isValidElement(brand)) {
            thisChildren.push(clone(
                brand,
                {
                    className: mixClass(
                        brand.props.className,
                        'brand pure-u-1'
                    ),
                    key: 'brand'
                }
            ));
        }
        if (React.isValidElement(nav)) {
            thisChildren.push(
                clone(
                    nav,
                    {
                        className: mixClass(
                            'nav pure-u-1',
                            nav.props.className
                        ),
                        key: 'nav',
                        handleOn: this.handleOn
                    }
                ),
                <Icon
                    key="hamburger-icon"
                    className="hamburger-icon"
                    style={Styles.hamburgerIcon}
                    onClick={this.handleOn}
                >
                    <HamburgerIcon on={this.state.on} />
                </Icon>
            );
        }
        if (React.isValidElement(component)) {
            build = React.cloneElement;
        } else {
            build = React.createElement;
        }
        return build(
            component,
            {
                ...others,
                style: style,
                styles: reactStyle({
                    transition: [[
                        'padding 300ms linear',
                        'max-height 300ms ease-in-out'
                    ].join(', ')] 
                }, null, false),
                className: classes
            },
            thisChildren
        );
    }
}

export default HorizontalToVerticalMenu;

const Styles = {
    hamburgerIcon: {
        position: 'absolute',
        top: 10,
        right: 30,
        width: 35,
        height: 35,
        fill: '#fff',
        cursor: 'pointer'
    }
};
