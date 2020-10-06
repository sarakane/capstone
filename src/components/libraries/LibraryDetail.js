import React from 'react';
import PropTypes from 'prop-types';
import SectionList from '../sections/SectionList'

function LibraryDetail(props) {
  const { library, onClickingDelete, onClickingEdit } = props;

  return (
    <React.Fragment>
      <h1>Library</h1>
      <h2>{library.libraryName}</h2>
      <button onClick={onClickingEdit}>Edit</button>
      <button onClick={() => onClickingDelete(library.id)}>Delete</button>
      <hr />
      <h3>Sections</h3>
      <SectionList libraryId={library.id} />
      <button>New Section</button>
      <hr />
    </React.Fragment>
  );
}

LibraryDetail.propTypes = {
  library: PropTypes.object,
  onClickingDelete: PropTypes.func,
  onClickingEdit: PropTypes.func
};

export default LibraryDetail;