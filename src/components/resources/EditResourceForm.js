import React from 'react';
import PropTypes from 'prop-types';
import { useFirestore } from 'react-redux-firebase';

const editButtonStyle = {
  marginBottom: '5px'
}

function EditResourceForm(props) {
  const firestore = useFirestore();
  const { resource } = props;

  function handleEditResourceFormSubmission(event) {
    event.preventDefault();
    props.onEditResource();
    const propertiesToUpdate = {
      resourceName: event.target.resourceName.value
    }
    return firestore.update({collection: 'resources', doc: resource.id}, propertiesToUpdate);
  }

  return (
    <React.Fragment>
      <form onSubmit={handleEditResourceFormSubmission}>
        <input
          type='text'
          name='resourceName'
          defaultValue={resource.resourceName}
          required />
        <button type='submit' className='btn pink lighten-2' style={editButtonStyle}>Edit</button>
      </form>
    </React.Fragment>
  )
}

EditResourceForm.propTypes = {
  onNewResourceCreation: PropTypes.func
}

export default EditResourceForm;