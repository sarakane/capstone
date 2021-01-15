import React from 'react';
import PropTypes from 'prop-types';
import { useFirestore } from 'react-redux-firebase';

function NewSectionForm({setAddingSection, libraryId}) {
  const firestore = useFirestore();

  function addSectionToFirestore(event) {
    event.preventDefault();
    
    firestore.collection('sections').add(
      {
        sectionName: event.target.sectionName.value,
        creatorId: "user1",
        libraryId
      }
    );

    return setAddingSection(state => !state);
  }

  return (
    <React.Fragment>
      <form onSubmit={addSectionToFirestore}>
        <input
          type='text'
          name='sectionName'
          placeholder='New Section' 
          required />
        <button type='submit' className="btn blue-grey lighten-1" style={{marginRight:'5px'}}>Create</button>
        <button type='button' className="btn blue-grey lighten-1" onClick={() => setAddingSection(state => !state)}>Cancel</button>
      </form>
    </React.Fragment>
  )
}

NewSectionForm.propTypes = {
  setAddingSection: PropTypes.func,
  libraryId: PropTypes.string
}

export default NewSectionForm;