const Styles = {
    fadeInLeft: [ 
        [
            {
                 opacity: 0,
                 transform: ['translate3d(-100%, 0, 0)']
            },
            {
                opacity: 1,
                transform: ['none']
            }
        ],
        [ 
            '@keyframes fadeInLeft',
            'from',
            'to'
        ]
    ], 
    fadeInRight: [
        [
            {
                opacity: 0,
                transform: ['translate3d(100%, 0, 0)']
            },
            {
                opacity: 1,
                transform: ['none']
            }
        ],
        [
            '@keyframes fadeInRight',
            'from',
            'to'
        ]
    ],
    fadeOutLeft: [
        [
            {
                opacity: 1,
            },
            {
                opacity: 0,
                transform: ['translate3d(-100%, 0, 0)']
            }
        ],
        [
            '@keyframes fadeOutLeft',
            'from',
            'to'
        ]
    ],
    fadeOutRight: [
        [
            {
                opacity: 1,
            },
            {
                opacity: 0,
                transform: ['translate3d(100%, 0, 0)']
            }
        ],
        [
            '@keyframes fadeOutRight',
            'from',
            'to'
        ]
    ],
};

export default Styles;
