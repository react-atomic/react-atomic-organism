import React, {Component, cloneElement, createElement} from 'react';
import { 
    mixClass,
    reactStyle,
    Icon,
    SemanticUI
} from 'react-atomic-molecule';
import HamburgerIcon from 'ricon/HamburgerToX';

const getHorizontalToVerticalMenu = (Styles) =>
{
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
                children,
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
            if (React.isValidElement(brand)) {
                thisChildren.push(
                    cloneElement(
                        brand,
                        {
                            style: {
                                ...Styles.brand
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
                                ...Styles.nav
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

const Styles = {
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
       maxHeight: 60,
       overflow: 'hidden'
    },
    brand: {

    },
    nav: {

    }
};

export default getHorizontalToVerticalMenu(Styles);
