import React, { Component } from "react";
import { Field, Form, SemanticUI, mixClass } from "react-atomic-molecule";

class FormattedJSON extends Component {
  render() {
    let outputText;
    let outputClass;
    const { atom, indent, children, className, ...others } = this.props;
    try {
      if (indent) {
        let space = indent === "TAB" ? "\t" : parseInt(indent);
        outputText = this.formatJSON(children, space);
      } else {
        outputText = children;
      }
      outputClass = "output-good";
    } catch (err) {
      // JSON.parse threw an exception
      outputText = err.message;
      outputClass = "error";
    }

    const classes = mixClass(className, outputClass);
    let Parent;
    if ("form" === atom) {
      Parent = Form;
    } else {
      Parent = SemanticUI;
    }
    return (
      <Parent atom={atom} className="form">
        <Field
          readOnly={true}
          {...others}
          atom="textarea"
          value={outputText}
          className={classes}
        />
      </Parent>
    );
  }

  formatJSON(input, space) {
    let parsedData;
    if (typeof input === "string") {
      if (input.length === 0) {
        return "";
      }
      parsedData = JSON.parse(input);
    } else {
      parsedData = input;
    }
    if (!parsedData) {
      return "";
    }
    return JSON.stringify(parsedData, null, space);
  }
}

FormattedJSON.defaultProps = { atom: "form" };

export default FormattedJSON;
