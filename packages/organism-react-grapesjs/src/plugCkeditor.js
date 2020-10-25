const stopPropagation = (e) => e.stopPropagation();

const plugCkeditor = ({ grapesjs, CKEDITOR }) => {
  grapesjs.plugins.add("gjs-plugin-ckeditor", (editor, opts = {}) => {
    const c = {
      ...{position: "left"},
      ...opts
    };

    if (!CKEDITOR) {
      throw new Error("CKEDITOR instance not found");
    }

    editor.setStyle('[contenteditable="true"]{padding:5px;}');

    editor.setCustomRte({
      enable(el, rte) {
        // If already exists I'll just focus on it
        if (rte && rte.status != "destroyed") {
          this.focus(el, rte);
          return rte;
        }

        el.contentEditable = true;

        // Seems like 'sharedspace' plugin doesn't work exactly as expected
        // so will help hiding other toolbars already created
        let rteToolbar = editor.RichTextEditor.getToolbarEl();
        [].forEach.call(rteToolbar.children, (child) => {
          child.style.display = "none";
        });

        // Check for the mandatory options
        var opt = c.options;
        var plgName = "sharedspace";

        if (opt.extraPlugins) {
          if (typeof opt.extraPlugins === "string")
            opt.extraPlugins += "," + plgName;
          else opt.extraPlugins.push(plgName);
        } else {
          opt.extraPlugins = plgName;
        }

        if (!c.options.sharedSpaces) {
          c.options.sharedSpaces = { top: rteToolbar };
        }


        // Init CkEditors
        rte = CKEDITOR.inline(el, c.options);

        /**
         * Implement the `rte.getContent` method so that GrapesJS is able to retrieve CKE's generated content (`rte.getData`) properly
         *
         * See:
         *  - {@link https://github.com/artf/grapesjs/issues/2916}
         *  - {@link https://github.com/artf/grapesjs/blob/dev/src/dom_components/view/ComponentTextView.js#L80}
         *  - {@link https://ckeditor.com/docs/ckeditor4/latest/api/CKEDITOR_editor.html#method-getData}
         */
        rte.getContent = rte.getData;

        // Make click event propogate
        rte.on("contentDom", () => {
          var editable = rte.editable();
          editable.attachListener(editable, "click", () => {
            el.click();
          });
        });

        // The toolbar is not immediatly loaded so will be wrong positioned.
        // With this trick we trigger an event which updates the toolbar position
        rte.on("instanceReady", (e) => {
          var toolbar = rteToolbar.querySelector("#cke_" + rte.name);
          if (toolbar) {
            toolbar.style.display = "block";
          }
          editor.trigger("canvasScroll");
        });

        // Prevent blur when some of CKEditor's element is clicked
        rte.on("dialogShow", (e) => {
          const editorEls = grapesjs.$(
            ".cke_dialog_background_cover, .cke_dialog"
          );
          ["off", "on"].forEach((m) =>
            editorEls[m]("mousedown", stopPropagation)
          );
        });

        this.focus(el, rte);

        return rte;
      },

      disable(el, rte) {
        el.contentEditable = false;
        if (rte && rte.focusManager) rte.focusManager.blur(true);
      },

      focus(el, rte) {
        // Do nothing if already focused
        if (rte && rte.focusManager.hasFocus) {
          return;
        }

        el.contentEditable = true;
        rte && rte.focus();
      },
    });

    // Update RTE toolbar position
    // getTargetToElementFixed
    // https://github.com/artf/grapesjs/blob/master/src/canvas/index.js#L450-L490
    editor.on("rteToolbarPosUpdate", (pos) => {
      if (pos.top <= pos.canvasOffsetTop) {
//        pos.top = pos.canvasOffsetTop;
      }

      // Check if not outside of the canvas
      if (pos.left < pos.canvasOffsetLeft) {
        pos.left = pos.canvasOffsetLeft;
      }
      // console.warn({pos});
    });
  });
};

export default plugCkeditor;
