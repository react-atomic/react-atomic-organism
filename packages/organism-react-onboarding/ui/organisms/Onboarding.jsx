import React, {
    cloneElement,
    PureComponent,
    Children
} from 'react';

class Onboarding extends PureComponent
{
    static defaultProps = {
        I18N: {
            next: 'Next',
            done: 'Done'
        }
    };

    constructor(props)
    {
        super(props);
        this.steps = [];
        let total = 0;
        Children.forEach(
           props.children,
           (c, key) => {
             this.steps[key] = c;
             total++;
           }
        );
        this.total = total;
        this.state = {
            stepIndex: 0
        };
    }

    next = (e) =>
    {
        this.setState( ({stepIndex}) => {
                stepIndex++;
                if (stepIndex >= this.total) {
                    stepIndex = null;
                }
                this.current.handleFinish();
                return {stepIndex};
            }
        );
    }

    back()
    {

    }

    render()
    {
        const {total, next} = this;
        const {I18N} = this.props;
        const {stepIndex} = this.state;
        if (null === stepIndex) {
            return null;
        }
        const currentStep = this.steps[stepIndex];
        return cloneElement(currentStep, {
            I18N,
            stepIndex,
            total,
            next,
            ref: el => this.current = el
        });
    }
}

export default Onboarding;
