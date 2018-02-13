import React, {Children, PureComponent} from 'react';
import Animate from '../organisms/Animate';

class Replace extends PureComponent
{
    static defaultProps = {
        interval: 3000
    };

    handleAniEnd = (node) =>
    {
        if (this.props.onExited) {
            this.props.onExited(node);
        }
        this.setState({
            no: this.next 
        });
    }

    handleNext = () =>
    {
        const {interval} = this.props;
        clearTimeout(this._time);
        this.setState((states)=>{
            let {no} = states;
            if (null !== no) {
                no++;
                if (no >= this.childs.length) {
                    no = 0;
                }
                this.next = no;
                return {no: null}; 
            } else {
                return {no: this.next};
            }
        });
        this._time = setTimeout(this.handleNext, interval); 
    }

    componentDidMount()
    {
        const {interval} = this.props;
        this._time = setTimeout(this.handleNext, interval);
    }

    componentWillUnmount()
    {
        clearTimeout(this._time);
        this._time = null;
    }

    componentWillReceiveProps(props)
    {   
        Children.forEach(
           props.children,
           (c, key) => this.childs[key] = c
        );
    }

    constructor(props)
    {
        super(props);
        this.childs = [];
        this.state = {
            no: 0
        };
        Children.forEach(
           props.children,
           (c, key) => this.childs[key] = c
        );
    }

    render()
    {
        const {interval, ...props} = this.props;
        const {no} = this.state;
        let show;
        if (this.childs[no]) {
            show = this.childs[no];
        } else {
            show = null;
        }
        return (
            <Animate
                {...props}
                onExited={this.handleAniEnd}
            >
                {show}
            </Animate>
        );
    }
}

export default Replace;
