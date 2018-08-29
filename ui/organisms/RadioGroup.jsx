import React, {PureComponent} from 'react'
import PropTypes from 'prop-types'
import Radio from '../organisms/Checkbox'

import {
    mixClass,
    Field,
    SemanticUI
} from 'react-atomic-molecule'

const Label = ({children, ...props})  => {
    if (!children) {
        return null
    } else {
        return (
        <SemanticUI {...props} atom="label">
        {children}
        </SemanticUI>
        )
    }
}

class RadioGroup extends PureComponent
{
    state = {value: null}

    static propTypes = {
        options: PropTypes.array.isRequired,
        name: PropTypes.string.isRequired,
    }

    handleClick = (e, before, after, ref) =>
    {
        const {onChange} = this.props
        let value = null
        if (ref) {
            if (ref.props.disabled) {
                return
            }
            value = ref.getValue()
        }
        this.setState({ value }, () => {
            if ('function' === typeof onChange) {
                onChange(e, value)
            }
        })
    }

    getValue()
    {
        return this.state.value
    }

    static getDerivedStateFromProps(nextProps, prevState)
    {
        const {value} = nextProps
        if (value !== prevState.prePropsValue) {
            return {
                value,
                prePropsValue: value
            }
        } else {
            return null
        }
    }

    render()
    {
        const {inline, label, options, name, value, onChange} = this.props
        const {value: stateValue} = this.state
        const classes = mixClass(
            {
                inline: inline,
                grouped: !inline
            }
        )
        return (
            <Field fieldClassName={classes}>
                <Label>{label}</Label>
                {
                    options.map( item =>
                        <Radio
                            type="radio" 
                            name={name}
                            {...item.props}
                            label={item.label}
                            value={item.value}
                            key={item.value}
                            afterClick={this.handleClick}
                            checked={stateValue === item.value}
                        />
                    )
                }
            </Field>
        )
    }
}

export default RadioGroup
