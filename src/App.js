import React, { Component } from "react";
import router from "./router";
import { HashRouter } from "react-router-dom";
import "./App.css";

class App extends Component {
  render() {
    return (
      <div className="App">
        <HashRouter>{router}</HashRouter>
      </div>
    );
  }
}

export default App;
