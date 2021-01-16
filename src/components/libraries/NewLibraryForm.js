import React from 'react';
import PropTypes from 'prop-types';
import { useFirestore } from 'react-redux-firebase';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

function NewLibraryForm() {
  const firestore = useFirestore();
  const history = useHistory();
  const auth = useSelector(state => state.firebase.auth);

  function addLibraryToFirestore(event) {
    event.preventDefault();

    firestore.collection('libraries').add(
      {
        libraryName: event.target.libraryName.value,
        creatorId: auth.uid
      }
    );

    return history.push('/home')
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
        <button type='submit' className="btn blue-grey lighten-1" style={{marginRight: '5px'}}>Create</button>
        <button type='button' className="btn blue-grey lighten-1" onClick={() => history.push('/home')}>Cancel</button>
      </form>
    </React.Fragment>
  )
}

NewLibraryForm.propTypes = {
  onNewLibraryCreation: PropTypes.func
}

export default NewLibraryForm;