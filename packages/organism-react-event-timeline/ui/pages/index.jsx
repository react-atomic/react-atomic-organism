import React,{Component} from 'react'; 

/**
 * Production please use
 * import Animate from "organism-react-animate"
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
