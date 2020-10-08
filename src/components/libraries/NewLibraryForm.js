import React from 'react';
import PropTypes from 'prop-types';
import { useFirestore } from 'react-redux-firebase';

const addMargin = {
  marginBottom: '5px'
}

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
        <div className="row">
          <div className="input-field col s6">
            <input
              type='text'
              name='libraryName'
              placeholder='New Library' 
              required />
            </div>
          </div>
        <button type='submit' className="btn blue-grey lighten-1" style={addMargin}>Create</button>
      </form>
    </React.Fragment>
  )
}

NewLibraryForm.propTypes = {
  onNewLibraryCreation: PropTypes.func
}

export default NewLibraryForm;