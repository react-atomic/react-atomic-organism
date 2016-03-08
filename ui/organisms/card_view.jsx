import React, {Component} from 'react'; 
import {
    assign,
    mixClass,
    Item,
    Card,
    Content,
    Header,
    Meta,
    Description
} from 'react-atomic-molecule';

export default class CardView extends Component
{
    render()
    {
        let props = this.props;
        let header = null;
        let meta = null;
        let description = null;
        let View;
        if (props.header) {
            header=<Header>{props.header}</Header>;
        }
        if (props.meta) {
            meta=<Meta>{props.meta}</Meta>;
        }
        if (props.description) {
            description=<Description>{props.description}</Description>;
        }
        if (props.item) {
            View = Item;
        } else {
            View = Card;
        }

        return (
            <View>
                <Content>
                    {header}
                    {meta}
                    {description}
                </Content>
            </View>
        );
    }
}
