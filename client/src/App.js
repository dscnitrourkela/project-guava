import { Route, Switch } from "react-router-dom";
import React from "react";
import Authenticate from "./Authenticate";
import "./Login.css";

function App() {
  return (
    <>
      <Authenticate />
      {/* <Switch>
        <Route exact path="/" component="Authenticate" />
      </Switch> */}
    </>
  );
}

export default App;
