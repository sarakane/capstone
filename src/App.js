import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import * as route from './constants/routes';
import Navigation from './components/Navigation';
import Account from './pages/Account';
import Home from './pages/Home';
import Landing from './pages/Landing';
import SignUp from './pages/SignUp';
import SignIn from './pages/SignIn';
import ForgotPassword from './pages/ForgotPassword';
import LibraryDetail from './components/libraries/LibraryDetail';
import NewLibraryForm from './components/libraries/NewLibraryForm';

function App() {
  return (
    <Router>
      <Navigation />
      <div className='container'>
        <Route exact path={route.LANDING} component={Landing} />
        <Route path={route.HOME} component={Home} />
        <Route path={route.FORGOT_PASSWORD} component={ForgotPassword} />
        <Route path={route.SIGN_IN} component={SignIn} />
        <Route path={route.SIGN_UP} component={SignUp} />
        <Route path={route.ACCOUNT} component={Account} />
        <Route path={route.LIBRARY_PAGE} component={LibraryDetail} />
        <Route path={route.CREATE_LIBRARY} component={NewLibraryForm} />
      </div>
    </Router>
  );
}

export default App;
