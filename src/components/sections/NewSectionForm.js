import React from 'react';
import PropTypes from 'prop-types';
import { useFirestore } from 'react-redux-firebase';

const createButtonStyle = {
  marginBottom: '5px'
}

function NewSectionForm({onNewSectionCreation, libraryId}) {
  const firestore = useFirestore();

  function addSectionToFirestore(event) {
    event.preventDefault();

    onNewSectionCreation();

    return firestore.collection('sections').add(
      {
        sectionName: event.target.sectionName.value,
        creatorId: "apple1",
        libraryId
      }
    );
  }

  return (
    <React.Fragment>
      <form onSubmit={addSectionToFirestore}>
        <input
          type='text'
          name='sectionName'
          placeholder='New Section' 
          required />
        <button type='submit' className="btn pink lighten-2" style={createButtonStyle}>Create</button>
      </form>
    </React.Fragment>
  )
}

NewSectionForm.propTypes = {
  onNewSectionCreation: PropTypes.func,
  libraryId: PropTypes.string
}

export default NewSectionForm;