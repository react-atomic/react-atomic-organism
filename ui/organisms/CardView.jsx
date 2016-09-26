import React, {Component} from 'react'; 
import {
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

export default class CardView extends Component
{
    render()
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
            ...props 
        } = this.props;
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
            >
                <Image style={Styles.image} src={imageSrc} className="rounded"/>
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
            <View {...props}>
                {image}
                {content}
                {dimmer}
            </View>
        );
    }
}

const Styles = {
    image: {
        maxWidth:'100%',
        position: 'absolute'
    },
    imgWrapper: {
        position: 'relative',
        paddingBottom:'100%',
        overflow:'hidden'
    }
};
