import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Home from "./Component/Home";
import JoiningRoom from "./Component/JoiningRoom";
import PlayingArena from "./Component/PlayingArena";
import SinglePlayer from "./Component/SinglePlayer";

const Router = () => {
  return (
    <>
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/join" component={JoiningRoom} />
          <Route exact path="/join/:roomId" component={PlayingArena} />
          <Route exact path="/singlePlayer" component={SinglePlayer} />
        </Switch>
      </BrowserRouter>
    </>
  );
};

export default Router;
