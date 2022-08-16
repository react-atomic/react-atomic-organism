import {
  useImperativeHandle,
  forwardRef,
  useState,
  useRef,
  useEffect,
} from "react";
import { popupDispatch, FullScreen } from "organism-react-popup";
import { SemanticUI } from "react-atomic-molecule";
import { Suggestion } from "react-atomic-organism";
import callfunc, { getEventKey } from "call-func";
import { win } from "win-doc";

import SelectFilter from "../organisms/SelectFilter";

const defaultCommandLocator = (item) => item.command;

const CommandPalette = forwardRef((props, ref) => {
  const {
    commands,
    commandLocator = defaultCommandLocator,
    onChange,
    onlyCallCommand,
  } = props;

  const lastSel = useRef();

  const [show, setShow] = useState();
  const expose = {
    open: () => setShow(true),
  };

  useImperativeHandle(ref, () => expose, []);

  useEffect(() => {
    if (show) {
      setTimeout(() => {
        lastSel.current?.focus();
      }, 300);
    }
  }, [show]);

  useEffect(() => {
    const keyArr = [];
    const handleKeydown = (e) => {
      const key = e.key;
      keyArr.push(key);
    };
    const handleKeyup = (e) => {
      console.log(JSON.stringify(keyArr));
      keyArr.splice(0, keyArr.length);
      console.log(JSON.stringify(keyArr));
    };
    win().addEventListener("keydown", handleKeydown);
    win().addEventListener("keyup", handleKeyup);
    return () => {
      win().removeEventListener("keydown", handleKeydown);
      win().removeEventListener("keyup", handleKeyup);
    };
  }, []);

  let commandEl = null;

  if (show) {
    commandEl = (
      <FullScreen page={false} onClose={() => setShow(false)}>
        <SelectFilter
          ref={lastSel}
          inputProps={{ type: "text" }}
          alwaysOpen
          icon={false}
          options={commands}
          style={Styles.container}
          onItemClick={(e) => {
            const item = e.item;
            if (!item) {
              return;
            }
            const command = commandLocator(item);
            if (onlyCallCommand) {
              callfunc(command || onChange, [item]);
            } else {
              callfunc(onChange, [item]);
              callfunc(command, [item]);
            }
            setShow(false);
          }}
        />
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
