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
                appear: 'fadeInLeft'
            }}
            evenAnimate={{
                appear: 'fadeInRight'
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
                },
                {
                    header: 'header3',
                    description: 'desc3',
                    from: ['2016','present'],
                    to: ['2010','August']
                },
                {
                    header: 'header4',
                    description: 'desc4',
                    from: ['2016','present'],
                    to: ['2010','August']
                },
                {
                    header: 'header5',
                    description: 'desc5',
                    from: ['2016','present'],
                    to: ['2010','August']
                },
                {
                    header: 'header6',
                    description: 'desc6',
                    from: ['2016','present'],
                    to: ['2010','August']
                },
                {
                    header: 'header7',
                    description: 'desc7',
                    from: ['2016','present'],
                    to: ['2010','August']
                },
                {
                    header: 'header8',
                    description: 'desc8',
                    from: ['2016','present'],
                    to: ['2010','August']
                },
                {
                    header: 'header9',
                    description: 'desc9',
                    from: ['2016','present'],
                    to: ['2010','August']
                },
                {
                    header: 'header10',
                    description: 'desc10',
                    from: ['2016','present'],
                    to: ['2010','August']
                }
            ]}
        />
    );
};

export default Index;
