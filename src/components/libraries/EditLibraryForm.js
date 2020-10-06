import React from 'react';
import PropTypes from 'prop-types';
import { useFirestore } from 'react-redux-firebase';

function EditLibraryForm(props) {
  const firestore = useFirestore();
  const { library } = props;

  function handleEditLibraryFormSubmission(event) {
    event.preventDefault();
    props.onEditLibrary();
    const propertiesToUpdate = {
      libraryName: event.target.libraryName.value
    }
    return firestore.update({collection: 'libraries', doc: library.id}, propertiesToUpdate);
  }

  return (
    <React.Fragment>
      <form onSubmit={handleEditLibraryFormSubmission}>
        <input
          type='text'
          name='libraryName'
          defaultValue={library.libraryName}
          required />
        <button type='submit'>Edit</button>
      </form>
    </React.Fragment>
  )
}

EditLibraryForm.propTypes = {
  onNewLibraryCreation: PropTypes.func
}

export default EditLibraryForm;