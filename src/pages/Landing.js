import React from "react";

const fancyFont = {
  fontFamily: 'Just Me Again Down Here, cursive'
}

const Landing = () => {
  return (
    <div style={fancyFont}>
      <h1>Welcome to Resourcey!</h1>
      <p style={{fontSize: "30px"}}>Share your learning resources with your classmates</p>
    </div>
  );
};

export default Landing;
