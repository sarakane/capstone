import React from 'react';

const brandLogoStyle = {
  fontFamily: 'Just Me Again Down Here, cursive',
  marginLeft: '10px'
}

function Navigation(){
  return (
    <React.Fragment>      
      <nav className="blue-grey">
        <div className="nav-wrapper">
          {/* eslint-disable-next-line */}
          <a href="#" className="brand-logo" style={brandLogoStyle}>Resourcey</a>
          <ul id="nav-mobile" className="right hide-on-med-and-down">
            {/* eslint-disable-next-line */}
            <li><a href="sass.html">About</a></li>
            {/* eslint-disable-next-line */}
            <li><a href="badges.html">Sign In</a></li>
            {/* eslint-disable-next-line */}
            <li><a href="collapsible.html">Sign Up</a></li>
          </ul>
        </div>
      </nav> 
    </React.Fragment>
  );
}

export default Navigation;