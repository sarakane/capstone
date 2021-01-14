import React, { useState } from 'react';
import PropTypes from 'prop-types';
import SectionList from '../sections/SectionList'
import NewSectionForm from '../sections/NewSectionForm';
import { useSelector } from 'react-redux';

const editButtonStyle = {
  marginRight: '5px'
};

function LibraryDetail({ match }) {
  const [addingSection, setAddingSection] = useState(false);
  const library = useSelector(state => state.firestore.ordered.libraries.find(e => e.id === match.params.id));
  console.log(match);

  const toggleNewSectionForm = () => {
    setAddingSection(!addingSection);
  }

  return (
    <React.Fragment>
      <h1>Library</h1>
      <h2>{library.libraryName}</h2>
      {/* <button onClick={onClickingEdit} className="btn deep-purple darken-4" style={editButtonStyle}>Edit</button>
      <button onClick={() => onClickingDelete(library.id)} className="btn deep-purple darken-4">Delete</button>
      <hr />
      <h3>Sections</h3>
      <SectionList libraryId={library.id} whenSectionClicked={whenSectionClicked}/>
      {addingSection && <NewSectionForm onNewSectionCreation={toggleNewSectionForm} libraryId={library.id}/>}
      <button onClick={toggleNewSectionForm} className="btn blue-grey lighten-1">{addingSection ? "Cancel": "New Section"}</button>
      <hr /> */}
    </React.Fragment>
  );
}

LibraryDetail.propTypes = {
  match: PropTypes.object,
};

export default LibraryDetail;