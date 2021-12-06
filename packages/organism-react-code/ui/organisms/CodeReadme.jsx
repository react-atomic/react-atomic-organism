import React, { Component } from "react";
import { marked } from "marked";
import { ajaxDispatch } from "organism-react-ajax";
import { Segment, Unsafe } from "react-atomic-molecule";

class CodeReadme extends Component {
  _isMount = true;
  constructor(props) {
    super(props);
    this.state = {
      text: "",
    };
  }

  componentDidMount() {
    let self = this;
    ajaxDispatch({
      type: "ajaxGet",
      params: {
        url: this.props.url,
        callback: (json, text, o) => {
          if (!this._isMount) {
            return false;
          }
          if (200 === o.status) {
            self.setState({
              text: text.replace(
                /(\<\!\-\-hidden\-\-\>)([\s\S]*?)(\<\!\-\-\/hidden\-\-\>)/g,
                ""
              ),
            });
          }
        },
      },
    });
  }

  componentWillUnmount() {
    this._isMount = false;
  }

  render() {
    const { text } = this.state;
    if (text) {
      return (
        <Segment>
          <Unsafe>{marked(text)}</Unsafe>
        </Segment>
      );
    } else {
      return null;
    }
  }
}
export default CodeReadme;
