import { SemanticUI } from "react-atomic-molecule";
import split from "../../lib/split";

const Highlight = ({ children, start, end, tagStyle }) => {
  if (!isNaN(start) && !isNaN(end)) {
    const arr = [];
    if (0 !== start * 1) {
      arr.push(children.substring(0, start));
    }
    arr.push(
      <SemanticUI atom="b" key={i} style={tagStyle} key="keyword">
        {children.substring(start, end)}
      </SemanticUI>
    );
    if (children.length !== end * 1) {
      arr.push(children.substring(end, children.length));
    }
    return arr;
  } else {
    const arr = split(children);
    return (
      <>
        {arr.map((item, i) => {
          if (item[0]) {
            return (
              <SemanticUI atom="b" key={i} style={tagStyle}>
                {item[1]}
              </SemanticUI>
            );
          } else {
            return item[1];
          }
        })}
      </>
    );
  }
};

export default Highlight;
