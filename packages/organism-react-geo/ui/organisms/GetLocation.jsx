import React, {PureComponent} from 'react';

import {
    Icon
} from 'react-atomic-molecule';

import LocIcon from 'ricon/MyLocation';

class GetLocation extends PureComponent
{
    state = {
        gpsState: 'on',
        loading: false,
    };

    handleSuccess = (pos) =>
    {
        const {onSuccess} = this.props;
	const {coords} = pos;
        const {latitude, longitude} = coords;
        this.setState({
            loading: false,
            gpsState: 'fixed'
        });
        if ('function' === typeof onSuccess) {
            onSuccess(
                latitude, 
                longitude,
                pos
            );
        }
    }

    handleError = (err) =>
    {
        const {onError} = this.props;
	console.warn('ERROR(' + err.code + '): ' + err.message);
        this.setState({
            loading: false,
            gpsState: 'off'
        });
        if ('function' === typeof onError) {
            onError(err);
        }
    }
    
    handleGetLocation = () =>
    {
        const {onGetLocation} = this.props;
        if ('function' === typeof onGetLocation) {
            onGetLocation(this);
        }
        this.setState({loading: true});
        const options = {
            enableHighAccuracy: true,
            timeout: 30000,
            maximumAge: 0
        };
        navigator
            .geolocation
            .getCurrentPosition(
                this.handleSuccess,
                this.handleError,
                options
            );
    }

    render()
    {
        const {gpsState, loading} = this.state;
        return (
            <Icon style={Styles.icon} onClick={this.handleGetLocation}>
            <LocIcon
                style={Styles.svg}
                type={gpsState}
                loading={loading}
            />
            </Icon>
        );
    }
}

export default GetLocation;

const Styles = {
    icon: {
        width: 25
    },
    svg: {
        cursor: 'pointer'
    }
};
