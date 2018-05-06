import React, {PureComponent} from 'react';
import ParallaxBackground from '../organisms/ParallaxBackground';
import {SemanticUI} from 'react-atomic-molecule';

class ParallaxBackgroundImage extends PureComponent
{
    render()
    {
        const {backgroundImage, ...others} = this.props;
        let thisBackgroundImage = null;
        if (backgroundImage) {
            thisBackgroundImage = (
                <SemanticUI
                    className="parllax-image"
                    style={{
                        ...Styles.backgroundImage,
                        backgroundImage: 'url("'+backgroundImage+'")',
                    }}
                />
            );
        }
        return (
        <ParallaxBackground
            {...others}
            background={thisBackgroundImage}
        />
        );
    }
}

export default ParallaxBackgroundImage;

const Styles = {
    backgroundImage: {
        backgroundPosition: '50% 50%',
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
        backgroundAttachment: 'fixed',
        width: '100vw',
        height: '300vh',
        willChange: 'scroll-position',
    }
};
