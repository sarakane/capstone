import React from 'react';
import PropTypes from 'prop-types';
import { useFirestore } from 'react-redux-firebase';

const createButtonStyle = {
  marginBottom: '5px'
}

function EditSectionForm({section, onEditSection}) {
  const firestore = useFirestore();

  function handleEditSectionFormSubmission(event) {
    event.preventDefault();
    onEditSection();
    const propertiesToUpdate = {
      sectionName: event.target.sectionName.value
    }
    return firestore.update({collection: 'sections', doc: section.id}, propertiesToUpdate);
  }

  return (
    <React.Fragment>
      <form onSubmit={handleEditSectionFormSubmission}>
        <input
          type='text'
          name='sectionName'
          defaultValue={section.sectionName} 
          required />
        <button type='submit' className="btn pink lighten-2" style={createButtonStyle}>Submit</button>
      </form>
    </React.Fragment>
  )
}

EditSectionForm.propTypes = {
  onEditSection: PropTypes.func,
  section: PropTypes.object
}

export default EditSectionForm;