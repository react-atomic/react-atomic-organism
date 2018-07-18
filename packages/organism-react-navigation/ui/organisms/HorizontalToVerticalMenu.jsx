import React, {cloneElement, createElement, isValidElement, Children, PureComponent} from 'react';
import { 
    min,
    lazyInject,
    mixClass,
    mergeStyleConfig,
    reactStyle,
    Icon,
    SemanticUI
} from 'react-atomic-molecule';
import HamburgerIcon from 'ricon/HamburgerToX';

export const getHorizontalToVerticalMenu = (Styles, merge) =>
{
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
    if (merge) {
        mergeStyleConfig(Styles, defaultStyles, InjectStyles);
    }
    class HorizontalToVerticalMenu extends PureComponent
    {
        state = {
            on: false
        }

        static defaultProps = {
            component: SemanticUI,
            brand: null,
            nav: null,
            height: 60,
        };

        handleOn = ()=>
        {
            this.setState(({on}) => {
                return {on: !on};
            });
        }

        constructor(props) 
        {
            super(props)
            injects = lazyInject (
                injects,
                InjectStyles
            )
        }

        render()
        {
            const {
                brand,
                component,
                nav,
                iconStyle,
                style,
                className,
                children,
                height,
                ...others
            } = this.props;
            const classes = mixClass(
                className,
                {
                    active: this.state.on
                }
            );
            let thisChildren = [];
            let build;
            if (isValidElement(brand)) {
                thisChildren.push(
                    cloneElement(
                        brand,
                        {
                            style: {
                                ...Styles.brand,
                                ...brand.props.style,
                                height: height,
                            },
                            className: mixClass(
                                brand.props.className,
                                'brand'
                            ),
                            key: 'brand'
                        }
                    )
                );
            }
            if (isValidElement(nav)) {
                thisChildren.push(
                    cloneElement(
                        nav,
                        {
                            style: {
                                ...Styles.nav,
                                ...nav.props.style
                            },
                            className: mixClass(
                                'nav',
                                nav.props.className
                            ),
                            key: 'nav',
                            handleOn: this.handleOn
                        }
                    ),
                );
            }
            Children.forEach(
                children,
                (child, key)=>{
                    thisChildren.push(
                        cloneElement(child, {key, handleOn: this.handleOn})
                    );
                }
            );
            if (isValidElement(nav)) {
                thisChildren.push(
                    <Icon
                        key="hamburger-icon"
                        className="hamburger-icon"
                        style={{...Styles.hamburgerIcon, ...iconStyle}}
                        onClick={this.handleOn}
                    >
                        <HamburgerIcon on={this.state.on} />
                    </Icon>
                );
            }
            if (isValidElement(component)) {
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
                        maxHeight: height,
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

let injects;
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
    },
    nav: {
        display: 'block'
    }
};

export default getHorizontalToVerticalMenu(
    defaultStyles
);

