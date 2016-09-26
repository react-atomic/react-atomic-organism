import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import React, {Component} from 'react'; 
import {XIco, Message, reactStyle} from 'react-atomic-molecule';

export default class AlertsNotifier extends Component
{
    constructor(props)
    {
        super(props);
        this.state = {
           dismissedAlerts: []
        };
    }

    dismiss(item)
    {
        if (this.props.onDismiss) {
            //if callback specified, call it
            this.props.onDismiss(item);
        } else {
            //if no callback for dismissal, just update our state
            let newData = this.state.dismissedAlerts.slice();
            newData.push(item);
            this.setState({ dismissedAlerts: newData });
        }
    }

    render()
    {
        let alerts = [];
        for (let i = 0, j=this.props.alerts.length; i < j; i++) {
            let item = this.props.alerts[i];
            if ( -1===this.state.dismissedAlerts.indexOf(item) ) {
                if (["success", "info", "warning", "error"].indexOf(item.type) < 0) {
                        item.type = "info";
                }
                alerts.push(item);
            }
        }
        let self = this;
        return (
            <ReactCSSTransitionGroup
                transitionName="alert"
                transitionEnterTimeout={500}
                transitionLeaveTimeout={300}
                transitionAppear={true}
                transitionAppearTimeout={500}
                style={Styles.container}
                component="div"
            >
            {
                alerts.map((item, i)=>{
                    return (
                    <Message key={i} type={item.type} header={item.header}>
                        {item.message}
                        <XIco onClick={self.dismiss.bind(self, item)} />
                    </Message>
                    );
                })
            }
            </ReactCSSTransitionGroup>
        );
    }
}

AlertsNotifier.propTypes = {
    alerts: React.PropTypes.array.isRequired,
    onDismiss: React.PropTypes.func
};

const Styles = {
    container: {
        position: 'fixed',
        top: '5px',
        left: '10px',
        right: '10px',
        zIndex: 9999
    },
    AnimationEnter: reactStyle({
        opacity: 0.01
    },'.alert-enter, .alert-appear'),
    AnimationEnterActive: reactStyle({
        opacity: 1,
        transition: ['opacity 500ms ease-in']
    },'.alert-enter.alert-enter-active, .alert-appear.alert-appear-active'),
    AnimationLeave: reactStyle({
        opacity: 1 
    },'.alert-leave'),
    AnimationLeaveActive: reactStyle({
        opacity: 0.01,
        transition: ['opacity 300ms ease-in']
    },'.alert-leave.alert-leave-active')
};
