import { useImperativeHandle, forwardRef, useState } from "react";
import { popupDispatch, FullScreen } from "organism-react-popup";
import { SemanticUI } from "react-atomic-molecule";
import { Suggestion } from "react-atomic-organism";
import callfunc from "call-func";

import Select from "../molecules/SelectFilterUI";

const defaultCommandLocator = (item) => item.command;

const CommandPalette = forwardRef((props, ref) => {
  const {
    commands,
    commandLocator = defaultCommandLocator,
    onChange,
    onlyCallCommand,
  } = props;
  const [show, setShow] = useState();
  const expose = {
    open: () => setShow(true),
  };

  useImperativeHandle(ref, () => expose, []);

  let commandEl = null;

  if (show) {
    const select = (
      <Select
        hideTitle
        search
        alwaysOpen
        icon={false}
        options={commands}
        style={Styles.container}
        onChange={(value, e) => {
          const item = e.item;
          const command = commandLocator(item);
          if (onlyCallCommand) {
            return command
              ? callfunc(command, [item])
              : callfunc(onChange, [item]);
          } else {
            callfunc(onChange, [item]);
            return callfunc(command, [item]);
          }
        }}
      />
    );
    commandEl = (
      <FullScreen page={false} onClose={() => setShow(false)}>
        <Suggestion component={select} />
      </FullScreen>
    );
  }

  return <>{commandEl}</>;
});

CommandPalette.displayName = "CommandPalette";

export default CommandPalette;

const Styles = {
  container: {
    width: 500,
  },
};
