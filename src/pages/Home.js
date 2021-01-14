import React from 'react';
import LibraryList from '../components/libraries/LibraryList';
import ProjectControl from '../components/ProjectControl';

const Home = ({ history }) => {
  return (
    <>
      <LibraryList history={history} />
    </>
  );
};

export default Home;
