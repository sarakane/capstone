import React from 'react';

const brandLogoStyle = {
  fontFamily: 'Just Me Again Down Here, cursive',
  marginLeft: '10px'
}

function Navigation(){
  return (
    <React.Fragment>      
      <nav className="blue-grey">
        <div Name="nav-wrapper">
          <a href="#" className="brand-logo" style={brandLogoStyle}>Resourcey</a>
          <ul id="nav-mobile" className="right hide-on-med-and-down">
            <li><a href="sass.html">About</a></li>
            <li><a href="badges.html">Sign In</a></li>
            <li><a href="collapsible.html">Sign Up</a></li>
          </ul>
        </div>
      </nav> 
    </React.Fragment>
  );
}

export default Navigation;