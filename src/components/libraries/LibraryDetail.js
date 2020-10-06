import React, { useState } from 'react';
import PropTypes from 'prop-types';
import SectionList from '../sections/SectionList'
import NewSectionForm from '../sections/NewSectionForm';

function LibraryDetail(props) {
  const { library, onClickingDelete, onClickingEdit } = props;
  const [addingSection, setAddingSection] = useState(false);

  const toggleNewSectionForm = () => {
    setAddingSection(!addingSection);
  }

  return (
    <React.Fragment>
      <h1>Library</h1>
      <h2>{library.libraryName}</h2>
      <button onClick={onClickingEdit}>Edit</button>
      <button onClick={() => onClickingDelete(library.id)}>Delete</button>
      <hr />
      <h3>Sections</h3>
      <SectionList libraryId={library.id} />
      {addingSection && <NewSectionForm onNewSectionCreation={toggleNewSectionForm} libraryId={library.id}/>}
      <button onClick={toggleNewSectionForm}>{addingSection ? "Cancel": "New Section"}</button>
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