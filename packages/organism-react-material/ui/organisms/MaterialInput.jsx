import React, {PureComponent} from 'react'; 
import {
    Field,
    SemanticUI,
    reactStyle
} from 'react-atomic-molecule';

class MaterialInput extends PureComponent
{
   static defaultProps = {
        value: '',
        type: "text",
        required: "required"
   }

   constructor(props)
   {
       super(props);
       this.state = {
           labelStyle: this.getLabelBlurStyle(props.value),
           barFocus: [],
           value: value
       };
    } 

    getLabelBlurStyle(value)
    {
        let labelStyle = [Styles.cardInputLabel];
        if (value) {
           labelStyle = this.getLabelFocusStyle();
        }
        return labelStyle;
    }

    getLabelFocusStyle()
    {
        const {labelFocusStyles} = this.props
        const focusStyles = (labelFocusStyles) ? 
            labelFocusStyles:
            Styles.labelFocus; 
        return [Styles.cardInputLabel, focusStyles];
    }

    render()
    {
        return (
            <Field 
                fieldStyles={Styles.cardFieldContainer}
                labelStyles={this.state.labelStyle}
                styles={Styles.cardInput}
                ui={false}
                atom="input"
                {...this.props}
                value={this.state.value}
                onFocus={()=>{
                    this.setState({
                        labelStyle:this.getLabelFocusStyle(),
                        barFocus: [Styles.inputBarStartFocus]
                    });
                }}
                onBlur={(e)=>{
                    let len = e.target.value.length;
                    this.setState({
                        labelStyle:this.getLabelBlurStyle(len),
                        barFocus: []
                    });
                }}
                onChange={(e)=>{
                    this.setState({
                        value: e.target.value 
                    });
                }}
            >
                <SemanticUI styles={Styles.cardInputBar}>
                     <span styles={this.state.barFocus} style={{...Styles.inputBarFocus, ...Styles.inputBarLeft}} />
                     <span styles={this.state.barFocus} style={{...Styles.inputBarFocus, ...Styles.inputBarRight}} />
                </SemanticUI>
            </Field>
        )
    }
}

export default MaterialInput;

const Styles = {
    cardFieldContainer: reactStyle({
        position: 'relative',
        margin: '0 60px 50px'
    }),
    cardInput: reactStyle({
        outline: 'none',
        zIndex: 1,
        position: 'relative',
        background: 'none',
        width: '100%',
        height: '60px',
        border: 0,
        color: '#212121',
        fontSize: '24px',
        fontWeight: '400',
        top: '7px'
    }),
    labelFocus: reactStyle({
        color: '#9d9d9d',
        transform: ['translate(-12%, -50%) scale(0.75)']
    }),
    cardInputLabel: reactStyle({
        position: 'absolute',
        top: 0,
        left: 0,
        color: '#757575',
        fontSize: '24px',
        fontWeight: '300',
        lineHeight: '60px',
        transition: ['0.2s ease'],        
    }),
    cardInputBar: reactStyle({
        position: 'absolute',
        left: 0,
        bottom: 0,
        backgroundColor: '#757575',
        width: '100%',
        height: '1px',
    }),
    inputBarFocus: {
        position: 'absolute',
        backgroundColor: '#ed2553',
        width: 0,
        height: '2px',
        transition: ['.2s ease']
    },
    inputBarLeft: {
        left: '50%'
    },
    inputBarRight: {
        right: '50%'
    },
    inputBarStartFocus: reactStyle({
        width: '50% !important'
    }),
};

