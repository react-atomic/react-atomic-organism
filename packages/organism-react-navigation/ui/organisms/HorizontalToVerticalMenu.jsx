import React, {Component, cloneElement, createElement} from 'react';
import { 
    min,
    lazyInject,
    mixClass,
    reactStyle,
    Icon,
    SemanticUI
} from 'react-atomic-molecule';
import HamburgerIcon from 'ricon/HamburgerToX';

export const getHorizontalToVerticalMenu = (Styles, merge) =>
{
    if (merge) {
        Styles = {
            ...defaultStyles,
            ...Styles
        };
    }
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
            injects = lazyInject (
                injects,
                InjectStyles
            );
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
                children,
                ...others
            } = this.props;
            const classes = mixClass(
                'pure-g',
                'page-header',
                className,
                {
                    active: this.state.on
                }
            );
            let thisChildren = [];
            let build;
            if (React.isValidElement(brand)) {
                thisChildren.push(
                    cloneElement(
                        brand,
                        {
                            style: {
                                ...Styles.brand,
                                ...brand.props.style
                            },
                            className: mixClass(
                                brand.props.className,
                                'brand pure-u-1'
                            ),
                            key: 'brand'
                        }
                    )
                );
            }
            if (React.isValidElement(nav)) {
                thisChildren.push(
                    cloneElement(
                        nav,
                        {
                            style: {
                                ...Styles.nav,
                                ...nav.props.style
                            },
                            className: mixClass(
                                'nav pure-u-1',
                                nav.props.className
                            ),
                            key: 'nav',
                            handleOn: this.handleOn
                        }
                    ),
                );
            }
            React.Children.forEach(
                children,
                (child, k)=>{
                    thisChildren.push(
                        child
                    );
                }
            );
            if (React.isValidElement(nav)) {
                thisChildren.push(
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
                build = cloneElement;
            } else {
                build = createElement;
            }
            return build(
                component,
                {
                    ...others,
                    styles: reactStyle({
                        ...Styles.container,
                        ...style,
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
    return HorizontalToVerticalMenu;
}

const defaultStyles = {
    hamburgerIcon: {
        position: 'absolute',
        top: 10,
        right: 30,
        width: 35,
        height: 35,
        fill: '#fff',
        cursor: 'pointer'
    },
    container: {
        position: 'relative',
        maxHeight: 60,
        overflow: 'hidden',
        boxSizing: 'border-box',
    },
    brand: {
        height: 60,
    },
    nav: {
        display: 'block'
    }
};

export default getHorizontalToVerticalMenu(
    defaultStyles
);

let injects;
const InjectStyles = {
    headerActive: [
        {
            maxHeight: '1000px !important' 
        },
        '.page-header.active'
    ], 
    lgHeaderNav: [
        {
            display: [
                'inline-flex !important',
                '-webkit-inline-box !important',
                '-ms-inline-flexbox !important'
            ]
        },
        [min.lg, '.page-header nav'] 
    ], 
    lgHamburgerIcon: [
        {
            display: 'none !important' 
        },
        [min.lg, '.page-header .hamburger-icon'] 
    ]
};
