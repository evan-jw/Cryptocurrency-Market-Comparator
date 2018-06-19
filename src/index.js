import React from "react";
import { render } from "react-dom";
import { Main } from "./Main/Main";
import "./index.css";

const App = () => (
  <div className="main-container">
    <header className="header">
    Crypto Market Comparator
    </header>
    <Main />
  </div>
);

render(<App />, document.getElementById("root"));
