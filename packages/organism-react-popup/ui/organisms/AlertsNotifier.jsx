import Animate from 'organism-react-animate';
import XIcon from 'ricon/X';
import React, {PureComponent} from 'react'; 
import PropTypes from 'prop-types';
import {Message, reactStyle} from 'react-atomic-molecule';
import {Set} from 'immutable';

class XIconEl extends PureComponent
{
    constructor(props)
    {
        super(props);
        this.state = {
           hoverStyle: null 
        };
    }

    handleMouseEnter = ()=>
    {
        this.setState({
            hoverStyle: {
                opacity: '.9'
            } 
        });
    }

    handleMouseLeave = ()=>
    {
        this.setState({
            hoverStyle: null 
        });
    }

    render()
    {
        const props = this.props;
        const {hoverStyle} = this.state;
        return (
            <XIcon 
                style={{
                    ...Styles.xicon,
                    ...hoverStyle
                }}
                weight=".1rem"
                onMouseEnter={this.handleMouseEnter}
                onMouseLeave={this.handleMouseLeave}
                {...props}
            />
        );
    }
}

class AlertsNotifier extends PureComponent
{

    constructor(props)
    {
        super(props);
        this.state = {
           dismissedAlerts: Set() 
        };
    }

    dismiss(item)
    {
        if (this.props.onDismiss) {
            //if callback specified, call it
            this.props.onDismiss(item);
        }
        //if no callback for dismissal, just update our state
        this.setState({ dismissedAlerts: this.state.dismissedAlerts.add(item) });
    }

    render()
    {
        const {
            ani,
            alerts,
            position
        } = this.props;
        const {
            dismissedAlerts
        } = this.state;
        let alertArr = [];
        alerts.forEach((item, key)=>{
            if ( !dismissedAlerts.has(item) ) {
                if (["success", "info", "warning", "error"].indexOf(item.type) < 0) {
                        item.type = "info";
                }
                alertArr.push((
                    <Message key={key} messageType={item.type} header={item.header}>
                        {item.message}
                        <XIconEl 
                            onClick={this.dismiss.bind(this, item)}
                        />
                    </Message>
                ));
            }
        });
        let positionStyle = {};
        if ('top' === position) {
            positionStyle.top = 5;
        } else {
            positionStyle.bottom = 5;
        }
        return (
            <Animate
                {...ani}
                style={{...Styles.container, ...positionStyle}}
            >
                {alertArr}
            </Animate>
        );
    }
}

AlertsNotifier.propTypes = {
    alerts: PropTypes.array.isRequired,
    onDismiss: PropTypes.func
};

AlertsNotifier.defaultProps = {
    ani: {
        appear: 'fadeIn',
        enter: 'fadeIn',
        leave: 'fadeOut'
    },
    position: 'top' 
};

export default AlertsNotifier;

const Styles = {
    container: {
        position: 'fixed',
        left: 10,
        right: 10,
        zIndex: 9999
    },
    xicon: {
        top: 20,
        right: 10,
        opacity: '.5'
    }
};
