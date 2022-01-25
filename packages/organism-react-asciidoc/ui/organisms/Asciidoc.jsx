import React, {
  useEffect,
  useRef,
  useMemo,
  useImperativeHandle,
  forwardRef,
} from "react";
import get from "get-object-value";
import Iframe from "organism-react-iframe";
import { Unsafe } from "react-atomic-molecule";
import callfunc from "call-func";
import windowOnload from "window-onload";
import query from "css-query-selector";
import { useTimer } from "reshow-hooks";

const VERSION = "[VERSION]";

const useAsciidoc = ({
  onLoadDelay = 1500,
  inlineCSS = "body {padding: 0; margin: 0; background: transparent !important;}",
  js = "https://cdn.jsdelivr.net/npm/@asciidoctor/core@[VERSION]/dist/browser/asciidoctor.min.js",
  css = "https://cdn.jsdelivr.net/npm/@asciidoctor/core@[VERSION]/dist/css/asciidoctor.min.css",
  npmVersion = "2.2.6",
  onLoad,
  options,
  attributes,
  children,
}) => {
  const lastIframe = useRef();
  const [onloadTimer] = useTimer();
  useEffect(() => {
    const oWin = lastIframe.current.getWindow();
    let clearWindowOnload;
    const handleLoad = (el) => {
      lastIframe.current.postHeight();
      callfunc(onLoad, [el]);
    };
    oWin.onRender = (outputEl) => {
      const { close, process } = windowOnload({
        doc: oWin.document,
      });
      clearWindowOnload = close;
      const run = () => {
        onloadTimer(() => handleLoad(outputEl), onLoadDelay);
      };
      process(() => {
        const imgs = query.from(outputEl).all("img");
        const allImgLen = imgs?.length;
        if (allImgLen) {
          let loadLen = 0;
          imgs.forEach((img) => {
            const oImg = new Image();
            oImg.onload = () => {
              loadLen++;
              if (loadLen >= allImgLen) {
                run();
              }
            };
            oImg.onerror = () => {
              loadLen++;
              if (loadLen >= allImgLen) {
                run();
              }
            };
            oImg.src = img.src;
          });
        }
        run();
        lastIframe.current.postHeight();
      });
    };
    return () => {
      callfunc(clearWindowOnload);
    };
  }, []);

  options = options || {};
  options.attributes = {
    ...get(options, ["attributes"], {}),
    ...attributes,
  };

  const thisJs = js.replace(VERSION, npmVersion);
  const thisCss = css.replace(VERSION, npmVersion);

  const expose = {
    getBody: () => lastIframe.current.getBody(),
  };

  const html = useMemo(
    () =>
      [
        `<link rel="stylesheet" type="text/css" href="${thisCss}" />`,
        `<script src="${thisJs}"></script>`,
        '<div id="data" style="display:none;">' + children + "</div>",
        '<div id="output"></div>',
        `
        <script>
	    var asciidoctor = Asciidoctor();
	    var html = asciidoctor.convert(
              document.getElementById('data').innerHTML,
              ${JSON.stringify(options)}
            );
            var output = document.getElementById('output');
	    output.innerHTML = html;
            window.onRender(output);
        </script>
        `,
      ].join(""),
    [thisCss, thisJs, children, options]
  );

  return {
    expose,
    inlineCSS,
    lastIframe,
    html,
  };
};

const Asciidoc = forwardRef((props, ref) => {
  const { expose, inlineCSS, lastIframe, html } = useAsciidoc(props);

  useImperativeHandle(ref, () => expose, []);

  return (
    <Iframe ref={lastIframe} inlineCSS={inlineCSS} autoHeight>
      <Unsafe>{html}</Unsafe>
    </Iframe>
  );
});

Asciidoc.displayName = "Asciidoc";

export default Asciidoc;
