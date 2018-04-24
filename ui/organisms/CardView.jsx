import React, {Component} from 'react'; 
import {
    reactStyle,
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
        image,
        imageAttr,
        imageContainer,
        imageSrc,
        imageWrapper,
        imageWrapperAttr,
        href,
        item,
        lineAtom,
        ...others 
    } = props;

    if (header) {
        header=<Header>{header}</Header>;
    }
    if (meta) {
        meta=<Meta>{meta}</Meta>;
    }
    if (description) {
        description=<Description lineAtom={lineAtom}>{description}</Description>;
    }

    /*Cook Image*/
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
                ...imageWrapperAttr
            },
            React.cloneElement(
                imageContainer,
                {
                    styles: reactStyle(
                        Styles.image,
                        null,
                        false
                    ),
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
        left: '50%',
        transform: ['translate(-50%, -50%)']
    },
    imgWrapper: {
        position: 'relative',
        paddingBottom:'100%',
        overflow:'hidden',
        display: 'block'
    }
};
