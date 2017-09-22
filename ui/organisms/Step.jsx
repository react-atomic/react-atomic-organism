import React from 'react'; 

import {
    mixClass,
    Icon,
    Content,
    Title,
    Description,
    SemanticUI
} from 'react-atomic-molecule';

const Step = ({icon, title, description, ...props}) =>
{
    if (icon) {
        icon = <Icon>{icon}</Icon>;
    }
    if (title) {
        title = <Title>{title}</Title>;
    }
    if (description) {
        description=<Description>{description}</Description>;
    }
    let content = null;
    if (title || description) {
        content = (
            <Content>
                {title}
                {description}
            </Content>
        );
    }
    const classes = mixClass (
        props.className,
        'step'
    );
    return (
        <SemanticUI {...props} className={classes}>
            {icon}
            {content}
        </SemanticUI>
    );
}

export default Step;
