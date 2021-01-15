import React from 'react';
import PropTypes from 'prop-types';
import { useFirestore } from 'react-redux-firebase';
import { useParams } from 'react-router-dom';

const createButtonStyle = {
  marginBottom: '5px',
};

function EditSectionForm({ section, setEditing, match }) {
  const firestore = useFirestore();
  let {id, id2} = useParams();

  function handleEditSectionFormSubmission(event) {
    event.preventDefault();
    const propertiesToUpdate = {
      sectionName: event.target.sectionName.value,
    };

    setEditing(state => !state)
    return firestore.update(
      { collection: 'libraries',  doc: id, subcollections: [{collection: 'sections', doc: id2}]},
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
          style={createButtonStyle}
        >
          Submit
        </button>
      </form>
    </>
  )
}

EditSectionForm.propTypes = {
  onEditSection: PropTypes.func,
  section: PropTypes.object,
  setSectionName: PropTypes.func,
};

export default EditSectionForm;
