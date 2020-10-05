import React from 'react';
import PropTypes from 'prop-types';

function LibraryDetail(props) {
  const { library } = props;

  return (
    <React.Fragment>
      <h1>Library</h1>
      <h2>{library.libraryName}</h2>
      <button>Edit</button>
      <button>Delete</button>
      <hr />
      <h3>Sections</h3>
      <button>New Section</button>
    </React.Fragment>
  );
}

LibraryDetail.propTypes = {
  library: PropTypes.object,
};

export default LibraryDetail;