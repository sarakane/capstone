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
import EditLibraryForm from './components/libraries/EditLibraryForm';
import SectionDetails from './components/sections/SectionDetails';
import ResourceDetails from './components/resources/ResourceDetails';
import PrivateRoute from './components/PrivateRoute';
import SignOut from './pages/SignOut';

function App() {
  
  return (
    <Router>
      <Navigation />
      <div className='container'>
        <Route exact path={route.LANDING} component={Landing} />
        <PrivateRoute path={route.HOME}><Home /></PrivateRoute>
        <Route path={route.FORGOT_PASSWORD} component={ForgotPassword} />
        <Route path={route.SIGN_IN} component={SignIn} />
        <Route path={route.SIGN_UP} component={SignUp} />
        <Route path={route.SIGN_OUT} component={SignOut} />
        <Route path={route.ACCOUNT} component={Account} />
        <PrivateRoute exact path={route.EDIT_LIBRARY}><EditLibraryForm /></PrivateRoute>
        <PrivateRoute exact path={route.RESOURCE_PAGE}><ResourceDetails /></PrivateRoute>
        <PrivateRoute exact path={route.SECTION_PAGE}><SectionDetails /></PrivateRoute>
        <PrivateRoute exact path={route.LIBRARY_PAGE}><LibraryDetail /></PrivateRoute>
        <PrivateRoute exact path={route.CREATE_LIBRARY}><NewLibraryForm /></PrivateRoute>
      </div>
    </Router>
  );
}

export default App;
