import React from 'react';
import Navigation from './components/Navigation';
import ProjectControl from './components/ProjectControl';

function App() {
  return (
    <React.Fragment>
      <Navigation />
      <div className="container">
        <ProjectControl />
      </div>
    </React.Fragment>
  );
}

export default App;
