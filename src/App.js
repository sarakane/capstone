import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import * as route from './constants/routes';
import Navigation from "./components/Navigation";

function App() {
  return (
    <Router>
      <Navigation />
      <div className="container">
        <Switch>
          <Route exact path={route.LANDING}></Route>
          <Route path={route.HOME}></Route>
          <Route path={route.ABOUT}></Route> 
          <Route path={route.FORGOT_PASSWORD}></Route>
          <Route path={route.ACCOUNT}></Route>
          <Route path={route.SIGN_IN}></Route>
          <Route path={route.SIGN_UP}></Route>
          <Route path={route.FORGOT_PASSWORD}></Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
