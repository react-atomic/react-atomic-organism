import React, {PureComponent} from 'react'; 

import {
    mixClass,
    Field,
    SemanticUI
} from 'react-atomic-molecule';

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
   }

    handleClick = (e) =>
    {
        const {beforeClick, afterClick} = this.props;
        if (beforeClick) {
            beforeClick(e);
        }
        this.setState({
            checked: !this.state.checked
        });
        if (afterClick) {
            afterClick(e);
        }
    }

    render()
    {
        const {toggle, slider, type, beforeClick, afterClick, ...props} = this.props;
        const {checked: stateChecked} = this.state;
        return (
           <Field
                {...props}
                type={type}
                inputWrapper={
                    <InputWrapper {...{
                            toggle: toggle,
                            slider: slider,
                            type: type,
                            checked: stateChecked
                        }}
                    />
                }
                checked={stateChecked}
                onClick={this.handleClick}
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
