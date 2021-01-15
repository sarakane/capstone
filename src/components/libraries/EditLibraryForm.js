import React from 'react';
import {
  isLoaded,
  useFirestore,
  useFirestoreConnect,
} from 'react-redux-firebase';
import { useSelector } from 'react-redux';

function EditLibraryForm({ match, history }) {
  const firestore = useFirestore();

  useFirestoreConnect([{ collection: 'libraries', doc: match.params.id }]);
  const library = useSelector(
    ({ firestore: { data } }) =>
      data.libraries && data.libraries[match.params.id]
  );

  function handleEditLibraryFormSubmission(event) {
    event.preventDefault();
    const propertiesToUpdate = {
      libraryName: event.target.libraryName.value,
    };
    firestore.update(
      { collection: 'libraries', doc: match.params.id },
      propertiesToUpdate
    );
    return history.push(`/library/${match.params.id}`);
  }

  if (isLoaded(library)) {
    return (
      <React.Fragment>
        <h2>Edit Library</h2>
        <form onSubmit={handleEditLibraryFormSubmission}>
          <input
            type='text'
            name='libraryName'
            defaultValue={library.libraryName}
            required
          />
          <button type='submit' className='btn blue-grey lighten-1'>
            Edit
          </button>
          <button
            type='button'
            className='btn blue-grey lighten-1'
            style={{ marginLeft: '5px' }}
            onClick={() => history.push(`/library/${match.params.id}`)}
          >
            Cancel
          </button>
        </form>
      </React.Fragment>
    );
  } else {
    return <></>;
  }
}

export default EditLibraryForm;
