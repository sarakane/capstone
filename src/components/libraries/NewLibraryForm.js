import React from 'react';
import PropTypes from 'prop-types';
import { useFirestore } from 'react-redux-firebase';

function NewLibraryForm(props) {
  const firestore = useFirestore();

  function addLibraryToFirestore(event) {
    event.preventDefault();

    props.onNewLibraryCreation();

    return firestore.collection('libraries').add(
      {
        libraryName: event.target.libraryName.value,
        creatorId: "apple1"
      }
    );
  }

  return (
    <React.Fragment>
      <form onSubmit={addLibraryToFirestore}>
        <input
          type='text'
          name='libraryName'
          placeholder='New Library' 
          required />
        <button type='submit' className="btn pink lighten-2">Create</button>
      </form>
    </React.Fragment>
  )
}

NewLibraryForm.propTypes = {
  onNewLibraryCreation: PropTypes.func
}

export default NewLibraryForm;