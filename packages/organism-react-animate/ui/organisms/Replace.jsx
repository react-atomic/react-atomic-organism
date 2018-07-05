import React, {Children, PureComponent} from 'react';
import Animate from '../organisms/Animate';

class Replace extends PureComponent
{
    static defaultProps = {
        interval: 5000,
    };

    state = {
        no: 0,
        childs: {}
    }

    handleExited = (node) =>
    {
        if (this.props.onExited) {
            this.props.onExited(node);
        }
        setTimeout(()=>
            this.setState({ no: this.next })
        );
    }

    handleNext = () =>
    {
        if (this._time) {
            clearTimeout(this._time);
        }
        const {interval} = this.props;
        this.setState(({no, childs})=>{
            if (null !== no) {
                no++;
                if (no >= childs.length) {
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
        if (this._time) {
            clearTimeout(this._time);
        }
        const {interval} = this.props;
        this._time = setTimeout(this.handleNext, interval);
    }

    componentWillUnmount()
    {
        clearTimeout(this._time);
        this._time = null;
    }

    static getDerivedStateFromProps(nextProps, prevState)
    {
        const {children} = nextProps

        if (children === prevState.prevChildren) {
            return null
        }

        const childs = []
        Children.map(children, c => c).forEach(
            (child, key) => childs[key] = child
        )
        return {
            childs,
            prevChildren: children
        }
    }

    render()
    {
        const {interval, ...props} = this.props;
        const {no, childs} = this.state;
        let show;
        if (no !== null && childs[no]) {
            show = childs[no];
        } else {
            show = null;
        }
        return (
            <Animate
                {...props}
                onExited={this.handleExited}
            >
                {show}
            </Animate>
        );
    }
}

export default Replace;
