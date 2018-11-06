import React from "react";
import { Switch, Route } from "react-router-dom";
import Home from "./components/Home/Home";
import CreateGame from "./components/CreateGame/CreateGame";
import ProfilePage from "./components/ProfilePage/ProfilePage";
export default (
  <Switch>
    <Route exact path="/" component={Home} />
    <Route path="/creategame" component={CreateGame} />
    <Route path="/profile/:auth_id" component={ProfilePage} />
  </Switch>
);
