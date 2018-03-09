import React, {PureComponent} from 'react';
import {
    lazyInject,
    mixClass,
    SemanticUI
} from 'react-atomic-molecule';

import get from 'get-object-value';

const keys = Object.keys;

let lazyDropzone;

const IconComponent = ({filetype}) =>
    <div
        data-filetype={filetype}
        className="filepicker-file-icon"
    >
        {filetype}
    </div>

class Dropzone extends PureComponent
{
    /**
     * please consult
     * http://www.dropzonejs.com/#configuration
     */
    getDjsConfig(props)
    {
        const {postUrl, djsConfig} = props;
        const option = {
            url: postUrl,
            ...djsConfig
        };
        return option;
    }

    /**
     * Takes event handlers in this.props.eventHandlers
     * and binds them to dropzone.js events
     */
    setupEvents() {
        const {eventHandlers} = this.props; 

        if (!this.dropzone || !eventHandlers) {
            return;
        }

        keys(eventHandlers).forEach( handlerKey => {
             this.dropzone.on( handlerKey, eventHandlers[handlerKey]);
        }); 

        this.dropzone.on('addedfile', file =>  {
            if (file) {
                this.setState( ({files}) => {
                    files.push(file);
                    return {files};
                });
            }
        });

        this.dropzone.on('removedfile', file => {
            if (file) {
                this.setState( ({files}) => {
                    files.forEach((f, fileIndex) => {
                        if (f.name === file.name && f.size === file.size) {
                            files.splice(fileIndex, 1);
                        }
                    });
                    return {files};
                });
            }
        });
    }

    processQueue()
    {
        this.dropzone.processQueue();
    }

    initDropzone(props)
    {
        const {postUrl} = props;
        if (!postUrl) {
            console.warn('Need set dropzone url and drop event handler');
        }
        const options = this.getDjsConfig(props);
        this.dropzone = new lazyDropzone(this.el, options);
        this.setupEvents();
    }

    destroyDropzone(callback)
    {
        const last = () =>
        {
            this.dropzone = this.dropzone.destroy();
            this.el.innerHTML = '';
            callback();
        };

        if (this.dropzone) {
            let files = this.dropzone.getActiveFiles();

            if (files.length > 0) {
                // Well, seems like we still have stuff uploading.
                // This is dirty, but let's keep trying to get rid
                // of the dropzone until we're done here.
                let queueDestroy = true;
                let destroyInterval = setInterval(() => {
                    if (!queueDestroy) {
                        last();
                        return clearInterval(destroyInterval);
                    }
                    queueDestroy = false;
                    files = this.dropzone.getActiveFiles();
                    if (!files || !files.length) {
                        last();
                        return clearInterval(destroyInterval);
                    }
                }, 500);
            } else {
                last();
            }
        }
    }

    constructor(props)
    {
        super(props);
        this.state = {
            files: []
        };
    }

    componentWillReceiveProps(nextProps)
    {
        const isChange = JSON.stringify(nextProps) !== JSON.stringify(this.props);
        if (isChange) {
            this.destroyDropzone(()=>{
                this.initDropzone(nextProps); 
            });    
        }
    }

    /**
     * React 'componentDidMount' method
     * Sets up dropzone.js with the component.
     */
    componentDidMount() {
        injects = lazyInject( injects, InjectStyles );
        import('../../src/dropzone').then((Dropzone)=>{
            Dropzone.autoDiscover = false;
            lazyDropzone = Dropzone;
            this.initDropzone(this.props);
        }); 
    }

    /**
     * React 'componentWillUnmount'
     * Removes dropzone.js (and all its globals) if the component is being unmounted
     */
    componentWillUnmount()
    {
        this.destroyDropzone(()=>{});    
    }

    render() {
        const {children, className, style, showFiletypeIcon, iconFiletypes} = this.props;
        const {files} = this.state;
        const icons = [];
        const classes = mixClass(className, 'filepicker dropzone');

        if ( showFiletypeIcon && iconFiletypes && get(files, ['length'], 0) ) {
            iconFiletypes.forEach( (fileType, key) => {
                icons.push(<IconComponent {...{key, fileType}} />);
            });
        }
        return (
            <SemanticUI
                refCb={el=>this.el=el}
                className={classes}
                style={{...Styles.container, ...style}}
            >
                {icons}
                {children}
            </SemanticUI>
        );
    }
}

export default Dropzone;

const Styles = {
    container: {
        backgroundColor: '#e1e1e1',
        minHeight: '60px',
        border: '2px dashed #c7c7c7',
        cursor: 'pointer'
    },
};

let injects;
const InjectStyles = {
    dropzone: [
        {
            boxSizing: 'border-box'
        },
        '.dropzone, .dropzone *'
    ],
    dropzonePreview: [
        {
            position: 'relative',
            display: 'inline-block',
            verticalAlign: 'top',
            minHeight: 120,
            maxWidth: 120,
            margin: 10,
            overflow: 'hidden'
        },
        '.dz-preview'
    ],
    dropzonePreviewHover: [
        {
            transform: ['scale(1.05, 1.05)'],
            filter: ['blur(8px)']
        },
        '.dropzone .dz-preview:hover .dz-image'
    ],
    dropzoneError: [
        {
            display: 'none',
            pointerEvents: 'none',
            transition: ['opacity 0.3s ease'],
            borderRadius: 8,
            fontSize: 10,
            width: '100%',
            background: 'linear-gradient(to bottom, #be2626, #a92222)',
            padding: '0.5em 1.2em',
            color: 'white',
            lineHeight: 1,
        },
        '.dz-error-message'
    ],
    displayDropzoneError: [
        {
            display: 'block'
        },
        '.dropzone .dz-preview.dz-error .dz-error-message'
    ],
    message: [
        {
            fontSize: '1.875rem',
            fontWeight: 300,
            textAlign: 'center'
        },
        '.dz-message'
    ],
    dropzoneThumbFile: [
        {
            width: 120,
            height: 120,
            background: 'linear-gradient(to bottom, #eee, #ddd)'
        },
        '.dz-preview.dz-file-preview .dz-image'
    ],
    dropzoneThumbFileDetail: [
        {
            opacity: 1,
        },
        '.dz-preview.dz-file-preview .dz-details'
    ],
    dropzoneImage: [
        {
            maxWidth: 120,
            maxHeight: 120
        },
        '.dz-preview .dz-image'
    ],
    dropzoneImagePreviewHover: [
        {
        },
        '.dz-preview:hover .dz-image'
    ],
    dropzoneDetail: [
        {
            position: 'absolute',
            top: 0,
            left: 0,
            opacity: 0,
            fontSize: '13px',
            minWidth: 120,
            maxWidth: 120,
            maxHeight: 120,
            padding: '2em 1em',
            textAlign: 'center',
            lineHeight: 1.5
        },
        '.dz-details'
    ],
    dropzoneDetailSpan: [
        {
            backgroundColor: 'rgba(255, 255, 255, 0.4)',
            padding: '0 0.4em',
            borderRadius: '3px'
        },
        '.dz-details .dz-filename span, .dz-details .dz-size span'
    ],
    dropzoneDetailHover: [
        {
            opacity: 1 
        },
        '.dz-preview:hover .dz-details'
    ],
    dropzoneSize: [
        {
            marginBottom: '1em',
            fontSize: '16px'
        },
        '.dz-details .dz-size'
    ],
    dropzoneDetailFilename: [
        {
            whiteSpace: 'nowrap',
        },
        '.dz-details .dz-filename'
    ],
    dropzoneDetailFilenameNotHover: [
        {
            overflow: 'hidden',
            textOverflow: 'ellipsis'
        },
        '.dz-details .dz-filename:not(:hover)'
    ],
    dropzoneDetailFilenameSpanHover: [
        {
            border: '1px solid rgba(200, 200, 200, 0.8)',
            backgroundColor: 'rgba(255, 255, 255, 0.8)',
        },
        '.dz-details .dz-filename:hover span'
    ],
    dropzoneDetailFilenameSpanNotHover: [
        {
            border: '1px solid transparent'
        },
        '.dz-details .dz-filename:not(:hover) span'
    ],
    dropzoneMark: [
        {
            zIndex: 0,
            opacity: 0,
            position: 'absolute',
            display: 'none',
            top: 0,
            left: '50%',
            animation: ['passing-through 3s cubic-bezier(0.77, 0, 0.175, 1)']
        },
        '.dz-success-mark, .dz-error-mark'
    ],
    dropzoneSuccessMark: [
        {
            display: 'block',
            opacity: 1,
            animation: ['passing-through 3s cubic-bezier(0.77, 0, 0.175, 1)']
        },
        '.dropzone .dz-preview.dz-success .dz-success-mark'
    ],
    dropzoneErrorMark: [
        {
            display: 'block',
            opacity: 1,
            animation: ['slide-in 3s cubic-bezier(0.77, 0, 0.175, 1)']
        },
        '.dropzone .dz-preview.dz-error .dz-error-mark'
    ],
    dropzoneMarkSvg: [
        {
            width: '54px',
            height: '54px'
        },
        '.dz-success-mark svg, .dz-error-mark svg'
    ],
    dropzoneProgressNotProcessing: [
        {
            animation: ['pulse 6s ease infinite']
        },
        '.dropzone .dz-preview:not(.dz-processing) .dz-progress'
    ],
    dropzoneRemoveLink: [
        {
            position: 'absolute',
            width: 120,
            top: 85,
            left: 0,
            zIndex: 999
        },
        '.dropzone .dz-remove'
    ],
    passingThrough: [
        [
            {
                opacity: 0,
                transform: ['translateY(40px)']
            },
            {
                opacity: 1,
                transform: ['translateY(0)']
            },
            {
                opacity: 0,
                transform: ['translateY(-40px)']
            }
        ],
        ['@keyframes passing-through', '0%', '30%, 70%', '100%']
    ],
    pulse: [
        [
            {
                transform: ['scale(1)']
            },
            {
                transform: ['scale(1.1)']
            },
            {
                transform: ['scale(1)']
            }
        ],
        ['@keyframes pulse', '0%', '10%', '20%']
    ],
    slideIn: [
        [
            {
                opacity: 0,
                transform: ['translateY(40px)']
            },
            {
                opacity: 1,
                transform: ['translateY(0)']
            }
        ],
        ['@keyframes slide-in', '0%', '30%']
    ]
};
