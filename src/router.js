import React from "react";
import { Switch, Route } from "react-router-dom";
import Home from "./components/Home/Home";
import CreateGame from "./components/CreateGame/CreateGame";
export default (
  <Switch>
    <Route exact path="/" component={Home} />
    <Route path="/creategame" component={CreateGame} />
  </Switch>
);
