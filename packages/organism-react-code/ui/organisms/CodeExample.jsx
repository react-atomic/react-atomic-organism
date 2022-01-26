import React, { useState } from "react";
import {
  useLazyInject,
  List,
  Header,
  Segment,
  SemanticUI,
  Icon,
} from "react-atomic-molecule";
import CodeIcon from "ricon/Code";
import GitIcon from "ricon/Git";
import NpmIcon from "ricon/Npm";
import EditIcon from "ricon/Edit";
import CodeBlock from "../organisms/CodeBlock";
import CodeReadme from "../organisms/CodeReadme";

const CodeExample = (props) => {
  injects = useLazyInject(InjectStyles, injects);
  const { header, children, code, git, npm, edit, id } = props;
  const [state, setState] = useState({ on: false });
  const handleClick = () =>
    setState(({ on }) => ({
      on: !on,
    }));

  let codeStyle = {};
  let thisCode;
  let thisReadme;
  let thisGit;
  let thisNpm;
  let thisEdit;
  if (!state.on) {
    codeStyle = Styles.hidden;
  } else {
    thisCode = <CodeBlock>{code}</CodeBlock>;
  }
  if (git) {
    const readmeUrl =
      "https://raw.githubusercontent.com/" +
      git.replace(/(\/(blob|tree)\/(master|main)\/)/, "/$3/") +
      "README.md";
    const gitUrl = "https://github.com/" + git;
    thisReadme = <CodeReadme url={readmeUrl} />;
    thisGit = (
      <Icon atom="a" target="_blank" href={gitUrl} style={Styles.icon}>
        <GitIcon />
      </Icon>
    );
  }
  if (npm) {
    const npmUrl = "https://www.npmjs.com/package/" + npm;
    thisNpm = (
      <Icon atom="a" target="_blank" href={npmUrl} style={Styles.icon}>
        <NpmIcon />
      </Icon>
    );
  }
  if (edit) {
    thisEdit = (
      <Icon atom="a" target="_blank" href={edit} style={Styles.icon}>
        <EditIcon />
      </Icon>
    );
  }
  return (
    <List type="segments" id={id}>
      <Segment className="tertiary">
        <Header style={Styles.header} className="grey">
          {header}
        </Header>
        <SemanticUI style={Styles.iconBlock}>
          {thisEdit}
          {thisNpm}
          {thisGit}
          <Icon onClick={handleClick} style={Styles.icon}>
            <CodeIcon />
          </Icon>
        </SemanticUI>
      </Segment>
      <Segment className="secondary" style={codeStyle} styles={injects.code}>
        {thisCode}
      </Segment>
      <Segment>{children}</Segment>
      {thisReadme}
    </List>
  );
};

export default CodeExample;

const Styles = {
  header: {
    margin: 0,
  },
  hidden: {
    maxHeight: 0,
    padding: "0 16px",
    margin: 0,
    ovarflow: "hidden",
  },
  iconBlock: {
    position: "absolute",
    top: 16,
    right: 6,
  },
  icon: {
    maxWidth: 24,
    cursor: "pointer",
    marginRight: 10,
  },
};

let injects;
const InjectStyles = {
  code: [
    {
      transition: ["padding 500ms ease"],
    },
  ],
  fitWidth: [
    {
      whiteSpace: "break-spaces",
    },
    "code",
  ],
};
