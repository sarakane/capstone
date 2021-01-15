import React from 'react';
import PropTypes from 'prop-types';
import { useFirestore } from 'react-redux-firebase';

function EditResourceForm({resource, setEditingResource, libraryId}) {
  const firestore = useFirestore();

  function handleEditResourceFormSubmission(event) {
    event.preventDefault();

    const propertiesToUpdate = {
      resourceName: event.target.resourceName.value,
      url: event.target.url.value,
      description: event.target.description.value
    }

    setEditingResource(state => !state);

    return firestore.update({collection: 'libraries', doc: libraryId, subcollections: [{collection: 'resources', doc: resource.id}]}, propertiesToUpdate);
  }

  return (
    <>
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
        <button type='submit' className='btn blue-grey lighten-1' style={{marginRight: '5px'}}>Edit</button>
        <button type='button' className='btn blue-grey lighten-1' onClick={() => setEditingResource(state => !state)}>Cancel</button>
      </form>
    </>
  )
}

EditResourceForm.propTypes = {
  resource: PropTypes.object,
  setEditingResource: PropTypes.func,
  libraryId: PropTypes.string
}

export default EditResourceForm;