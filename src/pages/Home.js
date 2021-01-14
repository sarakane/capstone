import React from 'react';
import LibraryList from '../components/libraries/LibraryList';

const Home = ({ history }) => {
  return (
    <>
      <LibraryList history={history} />
    </>
  );
};

export default Home;
