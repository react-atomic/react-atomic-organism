import React, {
    PureComponent,
    cloneElement,
    createElement
} from 'react';
import {
   SemanticUI 
} from 'react-atomic-molecule';

class Hero extends PureComponent
{
    static defaultProps = {
        component: SemanticUI,
    }

    render()
    {
	const {component, backgroundImage, style, ...others} = this.props;
        let build;
        if (React.isValidElement(component)) {
            build = React.cloneElement;
        } else {
            build = React.createElement;
        }
        const thisStyle = {};
        if (backgroundImage) {
            thisStyle.backgroundImage = 'url('+backgroundImage+')';
        }
        return build(
	    component,
	    {
		style: {
		    ...Styles.hero,
		    ...style,
                    ...thisStyle,
		},
		...others
	    } 
        );
    }
}

export default Hero;

const Styles = {
    hero: {
        height: '100vh',
        backgroundClip: 'content-box',
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat'
    }
};
