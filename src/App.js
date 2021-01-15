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
import { useFirebase } from 'react-redux-firebase';

function App() {
  const firebase = useFirebase();
  return (
    <Router>
      <Navigation />
      <div className='container'>
        <Route exact path={route.LANDING} component={Landing} />
        <Route path={route.HOME} component={Home} />
        <Route path={route.FORGOT_PASSWORD} component={ForgotPassword} />
        <Route path={route.SIGN_IN} component={SignIn} />
        <Route path={route.SIGN_UP} component={SignUp} />
        <Route path={route.SIGN_OUT} render={(props) => {firebase.logout(); props.history.push('/');}} />
        <Route path={route.ACCOUNT} component={Account} />
        <Route exact path={route.EDIT_LIBRARY} component={EditLibraryForm} />
        <Route exact path={route.RESOURCE_PAGE} component={ResourceDetails} />
        <Route exact path={route.SECTION_PAGE} component={SectionDetails} />
        <Route exact path={route.LIBRARY_PAGE} component={LibraryDetail} />
        <Route exact path={route.CREATE_LIBRARY} component={NewLibraryForm} />
      </div>
    </Router>
  );
}

export default App;
