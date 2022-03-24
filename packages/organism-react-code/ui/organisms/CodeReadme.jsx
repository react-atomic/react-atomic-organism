import React, { useEffect, useState } from "react";
import { ajaxDispatch } from "organism-react-ajax";
import { Segment, Unsafe } from "react-atomic-molecule";
import { useMounted } from "reshow-hooks";

import useSyntax from "../../src/useSyntax";

const CodeReadme = ({ url }) => {
  const _mounted = useMounted();
  const [text, setText] = useState();
  const syntax = useSyntax();
  useEffect(() => {
    ajaxDispatch("ajaxGet", {
      url,
      callback: (json, text, o) => {
        if (false === _mounted()) {
          return false;
        }
        if (200 === o.status) {
          setText(
            text.replace(
              /(\<\!\-\-hidden\-\-\>)([\s\S]*?)(\<\!\-\-\/hidden\-\-\>)/g,
              ""
            )
          );
        }
      },
    });
  }, []);

  if (text) {
    return (
      <Segment>
        <Unsafe>{syntax(text)}</Unsafe>
      </Segment>
    );
  } else {
    return null;
  }
};

export default CodeReadme;
