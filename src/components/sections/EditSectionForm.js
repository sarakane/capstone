import React from 'react';
import PropTypes from 'prop-types';
import { useFirestore } from 'react-redux-firebase';
import { useParams } from 'react-router-dom';

function EditSectionForm({ section, setEditing }) {
  const firestore = useFirestore();
  let { id, id2 } = useParams();

  function handleEditSectionFormSubmission(event) {
    event.preventDefault();
    const propertiesToUpdate = {
      sectionName: event.target.sectionName.value,
    };

    setEditing((state) => !state);
    return firestore.update(
      {
        collection: 'libraries',
        doc: id,
        subcollections: [{ collection: 'sections', doc: id2 }],
      },
      propertiesToUpdate
    );
  }

  return (
    <>
      <form onSubmit={handleEditSectionFormSubmission}>
        <input
          type='text'
          name='sectionName'
          defaultValue={section.sectionName}
          required
        />
        <button
          type='submit'
          className='btn blue-grey lighten-1'
          style={{ marginBottom: '5px', marginRight: '5px' }}
        >
          Submit
        </button>
        <button
          type='button'
          onClick={() => setEditing(state => !state)}
          className='btn blue-grey lighten-1'
          style={{ marginBottom: '5px' }}
        >
          Cancel
        </button>
      </form>
    </>
  );
}

EditSectionForm.propTypes = {
  section: PropTypes.object,
  setEditing: PropTypes.func,
};

export default EditSectionForm;
