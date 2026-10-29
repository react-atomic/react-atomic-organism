const React = require("react");
setTimeout(() => {
  const { createRoot } = require("react-dom/client");
  const ReactDOM = require("react-dom");
  const MyApp = require("../ui/pages/index");
  window.app = MyApp;
  window.ReactDOM = ReactDOM;
  createRoot(document.getElementById("app")).render(
    React.createElement(MyApp, REACT_DATA)
  );
});
