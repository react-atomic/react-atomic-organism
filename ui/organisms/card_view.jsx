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
        let props = this.props;
        let header = null;
        let meta = null;
        let description = null;
        let image = null;
        let content = null;
        let View;
        if (props.header) {
            header=<Header>{props.header}</Header>;
        }
        if (props.meta) {
            meta=<Meta>{props.meta}</Meta>;
        }
        if (React.isValidElement(props.description)) {
            description=props.description;
        } else if (props.description) {
            description=<Description>{props.description}</Description>;
        }
        if (props.imageSrc) {
           let imgWrapperDom = null;
           if (props.href) {
                imgWrapperDom = 'a'; 
           }
           image = 
            <SemanticUI
                atom={imgWrapperDom} 
                style={Styles.imgWrapper}
                href={props.href}
            >
                <Image style={Styles.image} src={props.imageSrc} className="rounded"/>
            </SemanticUI>; 
        }
        if (props.item) {
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
            <View>
                {image}
                {content}
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
