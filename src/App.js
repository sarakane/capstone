import React from 'react';
import Navigation from './components/Navigation';
import LibraryControl from './components/LibraryControl';

function App() {
  return (
    <React.Fragment>
      <Navigation />
      <div className="container">
        <LibraryControl />
      </div>
    </React.Fragment>
  );
}

export default App;
