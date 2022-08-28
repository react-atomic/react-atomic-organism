import {
  useImperativeHandle,
  forwardRef,
  useState,
  useRef,
  useEffect,
} from "react";
import { mixClass, SemanticUI } from "react-atomic-molecule";
import { Suggestion } from "react-atomic-organism";
import { popupDispatch, FullScreen } from "organism-react-popup";
import callfunc, { getEventKey } from "call-func";
import { win } from "win-doc";

import SelectFilter from "../organisms/SelectFilter";
import NotFoundComponent from "../molecules/NotFoundComponent";
import SearchButton from "../molecules/SearchButton";

const defaultCommandLocator = (item) => item.command;

const arrEq = (a, b) => JSON.stringify(a) === JSON.stringify(b);

const shouldRenderSuggestions = () => true;

const CommandPalette = forwardRef((props, ref) => {
  const {
    notFoundComponent = NotFoundComponent,
    commandLocator = defaultCommandLocator,
    hotkey,
    commands,
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
    if (hotkey) {
      const keyArr = [];
      const handleKeydown = (e) => {
        const key = e.key;
        keyArr.push(key);
        if (arrEq(keyArr, hotkey)) {
          setShow(true);
        }
      };
      const handleKeyup = (e) => keyArr.splice(0, keyArr.length);
      win().addEventListener("keydown", handleKeydown);
      win().addEventListener("keyup", handleKeyup);
      return () => {
        win().removeEventListener("keydown", handleKeydown);
        win().removeEventListener("keyup", handleKeyup);
      };
    }
  }, []);

  let commandEl = null;

  if (show) {
    commandEl = (
      <FullScreen page={false} onClose={() => setShow(false)}>
        {({ refCb, style, className, ...props }) => {
          return (
            <SelectFilter
              {...props}
              fieldProps={{ refCb }}
              fieldStyle={{ ...style, height: 125 }}
              fieldClassName={mixClass(className)}
              notFoundComponent={notFoundComponent}
              ref={lastSel}
              inputProps={{ type: "text" }}
              shouldRenderSuggestions={shouldRenderSuggestions}
              icon={false}
              onSubmit={false}
              options={commands}
              onItemClick={(e) => {
                const item = e.item;
                if (!item) {
                  return;
                }
                e.value = item;
                const command = commandLocator(item);
                if (onlyCallCommand) {
                  callfunc(command || onChange, [e]);
                } else {
                  callfunc(onChange, [e]);
                  callfunc(command, [e]);
                }
                setShow(false);
              }}
            />
          );
        }}
      </FullScreen>
    );
  }

  const handleClick = () => {
    expose.open();
  };

  return (
    <>
      <SearchButton keys={hotkey} onClick={handleClick} />
      {commandEl}
    </>
  );
});

CommandPalette.displayName = "CommandPalette";

export default CommandPalette;
