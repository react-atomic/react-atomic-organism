import React, { cloneElement } from "react";
import {
  mixClass,
  SemanticUI,
  Title,
  Description,
  Header,
  Content,
  List,
  Field,
  Form,
  Message,
  Unsafe,
} from "react-atomic-molecule";
import get from "get-object-value";

const doc = () => document;

const defaultUnHandle = (field) => (other, key) => {
  const { nodeName, src, outerHTML } = other;
  if (nodeName.toUpperCase() === "SCRIPT") {
    const d = doc();
    const dScript = d.createElement("script");
    dScript.src = src;
    d.body.appendChild(dScript);
    return null;
  } else {
    return <Unsafe key={key}>{outerHTML}</Unsafe>;
  }
};

const DjangoForm = ({
  className,
  actions,
  fields,
  header,
  csrfToken,
  formComponent,
  hasError,
  unHandle,
  ...props
}) => {
  let thisHeader = null;
  let formMessageType = null;
  if (hasError) {
    formMessageType = "error";
  }
  if (header) {
    thisHeader = <Header style={Styles.header}>{header}</Header>;
  }
  const thisChild = (
    <SemanticUI>
      <input
        type="hidden"
        name="csrfmiddlewaretoken"
        defaultValue={csrfToken}
      />
      {thisHeader}
      <Content style={Styles.content}>
        {fields.map((field, key) => {
          const rowClassName = [field.id];
          let fieldChild = null;
          let rowLabel = null;
          let thisMessage;
          let thisHelp;
          if (field.errors) {
            thisMessage = (
              <Message messageType="error">
                <Description>{field.errors}</Description>
              </Message>
            );
          }
          const inputParams = field.input;
          if (inputParams) {
            const { type: inputType } = inputParams;
            if (inputType === "hidden") {
              return <input {...inputParams} type="hidden" />;
            } else if (inputType === "password") {
              if (!inputParams.autoComplete) {
                inputParams.autoComplete = "current-password";
              }
            }
            const fieldClassName = mixClass({
              checkbox: inputType === "checkbox",
              required: inputParams.required,
              error: field.errors,
            });
            fieldChild = (
              <Field
                key={key + "-field-" + get(inputParams, ["name"])}
                fieldClassName={fieldClassName}
                label={field.label}
                atom="input"
                {...inputParams}
              />
            );
          } else {
            rowClassName.push("field");
            rowLabel = <label>{field.label}</label>;
          }
          let others = null;
          if (field.others) {
            const unHandler = unHandle(field);
            others = field.others.map((other, key) => unHandler(other, key));
          }
          if (field.helps) {
            thisHelp = (
              <Description style={Styles.help}>{field.helps}</Description>
            );
          }
          return (
            <SemanticUI
              className={rowClassName.join(" ")}
              key={key}
              style={Styles.row}
            >
              {rowLabel}
              {fieldChild}
              {others}
              {thisHelp}
              {thisMessage}
            </SemanticUI>
          );
        })}
      </Content>
      <List type="actions" style={Styles.actions}>
        {actions}
      </List>
    </SemanticUI>
  );

  if (!formComponent) {
    return thisChild;
  }

  return cloneElement(
    formComponent,
    {
      ...props,
      className: mixClass(formMessageType, className),
    },
    thisChild
  );
};

DjangoForm.defaultProps = {
  formComponent: <Form />,
  unHandle: defaultUnHandle,
  method: "post",
};

export default DjangoForm;

const Styles = {
  header: {
    textAlign: "center",
  },
  content: {
    marginBottom: 10,
  },
  actions: {
    textAlign: "right",
  },
  help: {
    fontSize: "0.7rem",
    color: "#999",
  },
  row: {
    marginBottom: 15,
    paddingBottom: 15,
    borderBottom: "1px solid #eee",
  },
};
