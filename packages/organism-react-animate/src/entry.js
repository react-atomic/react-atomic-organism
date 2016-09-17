Object.assign = null;
const React=require('react');
setTimeout(()=>{
  const ReactDOM = require('react-dom');
  const MyApp = React.createFactory(require('../ui/pages/index'));
  window.app=MyApp;
  window.ReactDOM=ReactDOM;
  ReactDOM.render(new MyApp(REACT_DATA), document.getElementById('app'));
});
