import React from 'react';
import PropTypes from 'prop-types';
import { useFirestore } from 'react-redux-firebase';

function NewSectionForm(props) {
  const firestore = useFirestore();

  function addSectionToFirestore(event) {
    event.preventDefault();

    props.onNewSectionCreation();

    return firestore.collection('sections').add(
      {
        sectionName: event.target.sectionName.value,
        creatorId: "apple1",
        libraryId: ""
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
        <button type='submit'>Create</button>
      </form>
    </React.Fragment>
  )
}

NewSectionForm.propTypes = {
  onNewSectionCreation: PropTypes.func
}

export default NewSectionForm;