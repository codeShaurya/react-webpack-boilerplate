import React from "react";
import ReactDOM from "react-dom";

import App from "./components/App";

console.log(`Hey this is ${process.env.NODE_ENV}`);

const render = Component => {
  ReactDOM.hydrate(<Component />, document.getElementById("app"));
};

render(App);

if (module.hot) {
  module.hot.accept("./components/App", () => {
    const App = require("./components/App").default;
    render(App);
  });
}
