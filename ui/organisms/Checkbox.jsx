import React, {PureComponent} from 'react'

import arrayMerge from 'array.merge'

import {
    lazyInject,
    mixClass,
    Field,
    SemanticUI
} from 'react-atomic-molecule'

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
   state = {}
   constructor(props) 
   {
       super(props);
       injects = lazyInject( injects, InjectStyles )
   }

   static getDerivedStateFromProps(nextProps, prevState)
   {
        const {checked} = nextProps
        let {id} = nextProps
        const nextState = {}
        if (checked !== prevState.prePropsChecked) {
            nextState.prePropsChecked = checked
            nextState.checked = checked
        }
        if (!id) {
            if (!prevState.id) {
                id = 'react-checkbox-'+ checkboxId
                checkboxId++
            }
        }
        if (id) {
            nextState.id = id
        }
        return nextState
   }

   getValue()
   {
        return this.el.value
   }

   getName()
   {
        return this.el.name
   }

   getInput()
   {
        return this.el
   }

    handleClick = e =>
    {
        if ('INPUT' !== e.target.nodeName) {
            e.preventDefault();
        }
        const {beforeClick, afterClick} = this.props;
        const beforeChecked = this.state.checked;
        let afterChecked = !this.state.checked;
        if ('function' === typeof beforeClick) {
            beforeClick(e, beforeChecked, afterChecked, this)
        }
        this.setState({
            checked: afterChecked
        });
        if ('function' === typeof afterClick) {
            afterClick(e, beforeChecked, afterChecked, this)
        }
    }

    handleChange = e =>
    {
        const {onChange} = this.props
        if ('function' === typeof onChange) {
            onChange(e, this)
        }
    }

    render()
    {
        const {refCb, toggle, label, slider, type, fieldStyles, beforeClick, afterClick, ...props} = this.props;
        const {checked: stateChecked, id} = this.state;
        let thisLabel = ' '
        if (label) {
            thisLabel = label
        }
        return (
           <Field
                {...{
                    ...props,
                    type,
                    id,
                    refCb: el => {
                        this.el = el 
                        if ('function' === typeof refCb) {
                            refCb(el)
                        }
                    },
                    label: thisLabel,
                    checked: stateChecked,
                    onChange: this.handleChange,
                    fieldStyles: arrayMerge(
                        injects.checkbox,
                        fieldStyles    
                    )
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

let injects
const InjectStyles = {
    checkbox: [
        {
            margin: 0
        }
    ]
}
