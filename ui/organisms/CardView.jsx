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
        imageSrc,
        href,
        item,
        ...others 
    } = props;
    let View;
    let image;

    if (header) {
        header=<Header>{header}</Header>;
    }
    if (meta) {
        meta=<Meta>{meta}</Meta>;
    }
    if (!React.isValidElement(description)) {
        description=<Description>{description}</Description>;
    }
    if (imageSrc) {
       let imgWrapperDom = null;
       if (href) {
            imgWrapperDom = 'a'; 
       }
       image = 
        <SemanticUI
            atom={imgWrapperDom} 
            style={Styles.imgWrapper}
            href={href}
            className="image-wrapper"
        >
            <Image
                style={Styles.image}
                styles={reactStyle({
                    transform: ['translate(-50%, -50%)']
                }, null, false)}
                src={imageSrc}
                className="rounded"
            />
        </SemanticUI>; 
    }
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
        overflow:'hidden'
    }
};
