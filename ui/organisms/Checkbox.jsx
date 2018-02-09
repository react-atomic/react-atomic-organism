import React, {PureComponent} from 'react'; 

import {
    mixClass,
    Field,
    SemanticUI
} from 'react-atomic-molecule';

let checkboxId = 0;

const InputWrapper = ({toggle, slider, type, checked, ...props}) =>
{
    const classes = mixClass(
        'checkbox',
        {
           radio: type==='radio', 
           toggle: toggle,
           slider: slider,
           checked: checked
        }
    );
    return (
        <SemanticUI {...props} className={classes} />
    );
}

class Checkbox extends PureComponent
{
   constructor(props) 
   {
       super(props);
       this.state = {
            checked: props.checked,
       };
       this.id = props.id;
       if (!this.id) {
           this.id = 'react-checkbox-'+ checkboxId;
           checkboxId++;
       }
   }

   componentWillReceiveProps(nextProps)
   {
        const {checked} = nextProps;
        if (checked !== this.state.checked) {
            this.setState({checked });
        }
   }

    handleClick = (e) =>
    {
        if ('INPUT' !== e.target.nodeName) {
            e.preventDefault();
        }
        const {beforeClick, afterClick} = this.props;
        const beforeChecked = this.state.checked;
        const afterChecked = !this.state.checked;
        if (beforeClick) {
            beforeClick(e, beforeChecked, afterChecked);
        }
        this.setState({
            checked: afterChecked
        });
        if (afterClick) {
            afterClick(e, beforeChecked, afterChecked);
        }
    }

    handleChange = e => {}

    render()
    {
        const {toggle, label, slider, type, style, beforeClick, afterClick, ...props} = this.props;
        const {checked: stateChecked} = this.state;
        let thisLabel = label;
        if (!thisLabel) {
            thisLabel = ' ';
        }
        return (
           <Field
                {...{
                    ...props,
                    type,
                    id: this.id,
                    label: thisLabel,
                    checked: stateChecked,
                    onChange: this.handleChange,
                    style: {...Styles.checkbox, ...style}
                }}
                inputWrapper={
                    <InputWrapper 
                        {...{
                            toggle,
                            slider,
                            type,
                            onClick: this.handleClick,
                            checked: stateChecked
                        }}
                    />
                }
            /> 
        );
    }
}

Checkbox.defaultProps = {
    atom: 'input',
    type: 'checkbox',
    checked: false 
};

export default Checkbox;

const Styles = {
    checkbox: {
        margin: 0
    }
};
