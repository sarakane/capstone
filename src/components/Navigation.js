import React from 'react';
import { useSelector } from 'react-redux';
import { useFirebase, useFirebaseConnect } from 'react-redux-firebase';
import { Link } from 'react-router-dom';
import * as route from '../constants/routes';

const brandLogoStyle = {
  fontFamily: 'Just Me Again Down Here, cursive',
  marginLeft: '10px',
};

function Navigation() {
  const auth = useSelector(state => state.firebase.auth);
  const firebase = useFirebase();

  return (
    <>
      <nav className='blue-grey'>
        <div className='nav-wrapper'>
          <Link
            to={route.LANDING}
            className='brand-logo'
            style={brandLogoStyle}
          >
            Resourcey
          </Link>
          <ul id='nav-mobile' className='right hide-on-med-and-down'>
            <li>
              <Link to={route.HOME}>Home</Link>
            </li>
            {!auth.isEmpty && <>
            <li>
              <Link to={route.SIGN_OUT}>Sign Out</Link></li>
            </>}
            {auth.isEmpty && <> <li>
              <Link to={route.SIGN_IN}>Sign In</Link>
            </li>
            <li>
              <Link to={route.SIGN_UP}>Sign Up</Link>
            </li></>}
          </ul>
        </div>
      </nav>
    </>
  );
}

export default Navigation;
