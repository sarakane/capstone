import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import * as route from './constants/routes';
import Navigation from "./components/Navigation";
import About from './pages/About';
import Account from './pages/Account';
import Home from './pages/Home';
import Landing from './pages/Landing';
import SignUp from './pages/SignUp';
import SignIn from './pages/SignIn';
import ForgotPassword from './pages/ForgotPassword';


function App() {
  return (
    <Router>
      <Navigation />
      <div className="container">
        <Switch>
          <Route exact path={route.LANDING}><Landing /></Route>
          <Route path={route.HOME}><Home /></Route>
          <Route path={route.ABOUT}><About /></Route> 
          <Route path={route.FORGOT_PASSWORD}><ForgotPassword /></Route>
          <Route path={route.ACCOUNT}><Account/></Route>
          <Route path={route.SIGN_IN}><SignIn /></Route>
          <Route path={route.SIGN_UP}><SignUp /></Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
