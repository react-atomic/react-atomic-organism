import React, {Component} from 'react'; 
import {
    reactStyle,
    assign,
    mixClass,
    Item,
    Image,
    Card,
    Content,
    Header,
    Meta,
    Description,
    SemanticUI
} from 'react-atomic-molecule';

const CardView = (props) =>
{
    let {
        header,
        meta,
        description,
        dimmer,
        content,
        imageAttr,
        imageContainer,
        imageSrc,
        imageWrapper,
        href,
        item,
        ...others 
    } = props;

    if (header) {
        header=<Header>{header}</Header>;
    }
    if (meta) {
        meta=<Meta>{meta}</Meta>;
    }
    if (description) {
        description=<Description>{description}</Description>;
    }

    /*Cook Image*/
    let image;
    if (imageSrc) {
       let imgWrapperDom;
       if (href) {
            imgWrapperDom = 'a'; 
       }
       if (!imageWrapper) {
            imageWrapper = <SemanticUI />;
       }
       if (!imageContainer) {
            imageContainer = <Image />;
       }
       image = React.cloneElement(
            imageWrapper,
            {
                atom: imgWrapperDom,
                className: 'image-wrapper',
                href: href,
                style: Styles.imgWrapper,
            },
            React.cloneElement(
                imageContainer,
                {
                    styles: reactStyle({
                        ...Styles.image,
                        transform: ['translate(-50%, -50%)']
                    }, null, false),
                    src: imageSrc,
                    className: 'rounded',
                    ...imageAttr
                }
            )
       );
       // fixed can't use padding with % in firefox and edge
       // http://stackoverflow.com/questions/23717953/padding-bottom-top-in-flexbox-layout
       image = <SemanticUI>{image}</SemanticUI>;
    }

    /*Cook View Type*/
    let View;
    if (item) {
        View = Item;
    } else {
        View = Card;
    }

    if (header || meta || description) {
        content = <Content>
            {header}
            {meta}
            {description}
        </Content>;
    }

    return (
        <View {...others}>
            {image}
            {content}
            {dimmer}
        </View>
    );
}

CardView.defaultProps = {
    imageAttr: {}
};

export default CardView;

const Styles = {
    image: {
        maxWidth:'100%',
        position: 'absolute',
        top: '50%',
        left: '50%'
    },
    imgWrapper: {
        position: 'relative',
        paddingBottom:'100%',
        overflow:'hidden',
        display: 'block'
    }
};
