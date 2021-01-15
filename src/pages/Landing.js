import React from "react";

const fancyFont = {
  fontFamily: 'Just Me Again Down Here, cursive'
}

const Landing = () => {
  return (
    <div style={fancyFont}>
      <h1>Welcome to Resourcey!</h1>
      <p style={{fontSize: "30px"}}>Share your learning resources with your classmates</p>
      <img src='/assets/books-computer.jpg' width='75%' height='75%' alt='Various electronic devices with pictures of books on their screens' style={{display: 'block', marginLeft: 'auto', marginRight: 'auto' }} />
    </div>
  );
};

export default Landing;
