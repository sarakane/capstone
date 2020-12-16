import React from 'react';
import { Link } from 'react-router-dom';
import * as route from '../constants/routes';

const brandLogoStyle = {
  fontFamily: 'Just Me Again Down Here, cursive',
  marginLeft: '10px'
}

function Navigation(){
  return (
    <>      
      <nav className="blue-grey">
        <div className="nav-wrapper">
          <Link to={route.LANDING} className="brand-logo" style={brandLogoStyle}>Resourcey</Link>
          <ul id="nav-mobile" className="right hide-on-med-and-down">
            <li><Link to={route.ABOUT}>About</Link></li>
            <li><Link to={route.HOME}>Home</Link></li>
            <li><Link to={route.SIGN_IN}>Sign In</Link></li>
            <li><Link to={route.SIGN_UP}>Sign Up</Link></li>
          </ul>
        </div>
      </nav> 
    </>
  );
}

export default Navigation;