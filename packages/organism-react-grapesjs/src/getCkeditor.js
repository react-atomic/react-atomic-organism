import callfunc from "call-func";
import fixHtml from './fixHtml';

const initCkeditorMergeTags = ({mergeTags, CKEDITOR, extraPlugins, toolbar, i18nMergeTags}) => {
  let isRun = 0;
  const buildList = function() {
    // !!important!! should not use arrow function
    this.startGroup(i18nMergeTags);
    const tags = callfunc(mergeTags);
    if (tags && tags.forEach) {
      // https://docs-old.ckeditor.com/ckeditor_api/symbols/src/plugins_richcombo_plugin.js.html
      // add : function( value, html, text )
      tags.forEach(m => this.add(m[0], m[1], m[2]));
    }
    if (isRun) {
      this._.committed = 0;
      this.commit();
    }
  };
  CKEDITOR.plugins.add("strinsert", {
    requires: ["richcombo"],
    init: editor => {
      editor.ui.addRichCombo("strinsert", {
        label: i18nMergeTags,
        title: i18nMergeTags,
        voiceLabel: i18nMergeTags,
        className: "cke_format",
        multiSelect: false,
        panel: {
          css: [editor.config.contentsCss, CKEDITOR.skin.getPath("editor")],
          voiceLabel: editor.lang.panelVoiceLabel
        },

        init: function() {
          editor.on("panelHide", () => {
            this._.list.element.$.innerHTML = "";
            this._.list._.items = {};
          });
          isRun = 0;
          buildList.call(this);
        },

        onOpen: function() {
          if (isRun) {
            buildList.call(this);
          }
          isRun = 1;
        },

        onClick: value => {
          editor.focus();
          editor.fire("saveSnapshot");
          editor.insertHtml(value);
          editor.fire("saveSnapshot");
        }
      });
    }
  });
  extraPlugins += ",strinsert";
  toolbar.push({ name: i18nMergeTags, items: ["strinsert"] });
  return extraPlugins;
};

const getCkeditorOption = ({ CKEDITOR, font, mergeTags, i18nMergeTags, options }) => {
  CKEDITOR.dtd.$editable.span = 1;
  CKEDITOR.dtd.$editable.a = 1;
  CKEDITOR.dtd.$editable.strong = 1;
  let extraPlugins = "sharedspace,justify,colorbutton,panelbutton,font";
  const fontItems = font ? ["Font"] : [];
  fontItems.push("FontSize");
  const toolbar = [
    { name: "styles", items: fontItems },
    ["Bold", "Italic", "Underline", "Strike"],
    { name: "paragraph", items: ["NumberedList", "BulletedList"] },
    { name: "links", items: ["Link", "Unlink"] },
    { name: "colors", items: ["TextColor", "BGColor"] }
  ];
  if (mergeTags) {
    extraPlugins = initCkeditorMergeTags({
      i18nMergeTags,
      mergeTags,
      CKEDITOR,
      extraPlugins,
      toolbar
    });
  }
  return {
    "gjs-plugin-ckeditor": {
      position: "center",
      // https://ckeditor.com/docs/ckeditor4/latest/api/CKEDITOR_config.html
      options: {
        on: {
          paste: e => {
            e.data.dataValue = fixHtml(e.data.dataValue);
          }
        },
        removePlugins: 'magicline',
        startupFocus: true,
        extraAllowedContent: "*(*);*{*}", // Allows any class and any inline style
        allowedContent: true, // Disable auto-formatting, class removing, etc.
        enterMode: CKEDITOR.ENTER_BR,
        autoParagraph: false,
        ...options,
        extraPlugins,
        toolbar
      }
    }
  };
};

export { getCkeditorOption };
