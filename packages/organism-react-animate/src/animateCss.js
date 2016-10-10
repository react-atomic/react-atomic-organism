const Styles = {
    fadeIn: [
        [
            { opacity: 0 },
            { opacity: 1 },
        ],
        [
            '@keyframes fadeIn',
            'from',
            'to'
        ]
    ],
    fadeInUp: [
        [
            {
                opacity: 0,
                transform: ['translate3d(0, 100%, 0)']
            },
            {
                opacity: 1,
                transform: ['none']
            }
        ],
        [
            '@keyframes fadeInUp',
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
    fadeInDown: [
        [
            {
                opacity: 0,
                transform: ['translate3d(0, -100%, 0)']
            },
            {
                opacity: 1,
                transform: ['none']
            }
        ],
        [
            '@keyframes fadeInDown',
            'from',
            'to'
        ]
    ],
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
    fadeOutUp: [
        [
            {
                opacity: 1,
            },
            {
                opacity: 0,
                transform: ['translate3d(0, -100%, 0)']
            }
        ],
        [
            '@keyframes fadeOutUp',
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
    fadeOutDown: [
        [
            {
                opacity: 1,
            },
            {
                opacity: 0,
                transform: ['translate3d(0, 100%, 0)']
            }
        ],
        [
            '@keyframes fadeOutDown',
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
};

export default Styles;
