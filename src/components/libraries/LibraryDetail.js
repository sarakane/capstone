import React from 'react';
import PropTypes from 'prop-types';

function LibraryDetail(props) {
  const { library, onClickingDelete } = props;

  return (
    <React.Fragment>
      <h1>Library</h1>
      <h2>{library.libraryName}</h2>
      <button>Edit</button>
      <button onClick={() => onClickingDelete(library.id)}>Delete</button>
      <hr />
      <h3>Sections</h3>
      <button>New Section</button>
      <hr />
    </React.Fragment>
  );
}

LibraryDetail.propTypes = {
  library: PropTypes.object,
  onClickingDelete: PropTypes.func
};

export default LibraryDetail;