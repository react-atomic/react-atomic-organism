import React, {Component} from 'react'; 
import {
    Field,
    Form,
    SemanticUI,
    assign,
    mixClass
} from 'react-atomic-molecule';

export default class FormattedJSON extends Component
{
    render()
    {
        let outputText;
        let outputClass;

      try {
        if (this.props.indent) {
            let indent = this.props.indent;
            let space = (indent === 'TAB') ? '\t' : parseInt(indent);
            outputText = this.formatJSON(this.props.children, space);
        } else {
            outputText = this.props.children;
        }
        outputClass = 'output-good';
      }
      catch (err) {
        // JSON.parse threw an exception
        outputText = err.message;
        outputClass = 'error';
      }

        let classes = mixClass(
            this.props.className
            ,outputClass
        );
        let Parent;
        if ('form' === this.props.atom) {
            Parent = Form;
        } else {
            Parent = SemanticUI;
        }
        let props = assign({},this.props);
        delete props.indent;
      return (
        <Parent atom={this.props.atom} className="form">
        <Field
          readOnly={true}
          {...props}
          atom="textarea"
          value={outputText}
          className={classes}
          children={null}
        />
        </Parent>
      );
    }

    formatJSON(input, space)
    {
      let parsedData;
      if (typeof input === 'string') {
          if (input.length === 0) {
            return '';
          }
          parsedData = JSON.parse(input);
      } else {
          parsedData = input;
      }
      if (!parsedData) {
        return '';
      }
      return JSON.stringify(parsedData, null, space);
    }
}
FormattedJSON.defaultProps = { atom: 'form' };
