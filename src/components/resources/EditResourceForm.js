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

    const editedResource = {
      resourceName: event.target.resourceName.value,
      url: event.target.url.value,
      description: event.target.description.value,
      creatorId: resource.creatorId,
      sectionId: resource.sectionId
    }

    props.onEditResource(editedResource);
    const propertiesToUpdate = {
      resourceName: event.target.resourceName.value,
      url: event.target.url.value,
      description: event.target.description.value
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
        <input
          type='text'
          name='url'
          defaultValue={resource.url}
          required />
        <input
          type='text'
          name='description'
          defaultValue={resource.description}
          required />
        <button type='submit' className='btn pink lighten-2' style={editButtonStyle}>Edit</button>
      </form>
    </React.Fragment>
  )
}

EditResourceForm.propTypes = {
  onEditResource: PropTypes.func,
  resource: PropTypes.object
}

export default EditResourceForm;