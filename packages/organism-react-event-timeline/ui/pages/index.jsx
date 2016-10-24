import React from 'react';

/**
 * Production please use
 * import {xxx} from "organism-react-event-timeline"
 */
import {
    EventTimeline,
    Event
} from "../../src/index"

const Index = (props) => {
    return (
        <EventTimeline
            backgroundColor="#fff"
            eventElement={<Event />}
            animate={{
                enter: 'fadeInLeft'
            }}
            evenAnimate={{
                enter: 'fadeInRight'
            }}
            events={[
                {
                    header: 'header',
                    description: 'desc',
                    from: ['2016','present'],
                    to: ['2010','August']
                },
                {
                    header: 'header2',
                    description: 'desc2',
                    from: ['2016','present'],
                    to: ['2010','August']
                }
            ]}
        />
    );
};

export default Index;
