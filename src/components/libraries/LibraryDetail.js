import React, { useState } from 'react';
import PropTypes from 'prop-types';
import SectionList from '../sections/SectionList'
import NewSectionForm from '../sections/NewSectionForm';

const editButtonStyle = {
  marginRight: '5px'
};

function LibraryDetail({ library, onClickingDelete, onClickingEdit, whenSectionClicked }) {
  const [addingSection, setAddingSection] = useState(false);

  const toggleNewSectionForm = () => {
    setAddingSection(!addingSection);
  }

  return (
    <React.Fragment>
      <h1>Library</h1>
      <h2>{library.libraryName}</h2>
      <button onClick={onClickingEdit} className="btn cyan accent-4" style={editButtonStyle}>Edit</button>
      <button onClick={() => onClickingDelete(library.id)} className="btn cyan accent-4">Delete</button>
      <hr />
      <h3>Sections</h3>
      <SectionList libraryId={library.id} whenSectionClicked={whenSectionClicked}/>
      {addingSection && <NewSectionForm onNewSectionCreation={toggleNewSectionForm} libraryId={library.id}/>}
      <button onClick={toggleNewSectionForm} className="btn pink lighten-2">{addingSection ? "Cancel": "New Section"}</button>
      <hr />
    </React.Fragment>
  );
}

LibraryDetail.propTypes = {
  library: PropTypes.object,
  onClickingDelete: PropTypes.func,
  onClickingEdit: PropTypes.func,
  whenSectionClicked: PropTypes.func
};

export default LibraryDetail;