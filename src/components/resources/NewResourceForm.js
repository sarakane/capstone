import React from 'react';
import PropTypes from 'prop-types';
import { useFirestore } from 'react-redux-firebase';
import { useParams } from 'react-router-dom';

function NewResourceForm({ sectionId, setCreatingNewResource }) {
  const firestore = useFirestore();
  const { id } = useParams();

  function addResourceToFirestore(event) {
    event.preventDefault();

    setCreatingNewResource(state => !state)

    return firestore
      .collection('libraries')
      .doc(id)
      .collection('resources')
      .add({
        resourceName: event.target.resourceName.value,
        url: event.target.url.value,
        description: event.target.description.value,
        sectionId: sectionId,
        creatorId: 'user1',
      });
  }

  return (
    <>
      <hr/>
      <form onSubmit={addResourceToFirestore} style={{marginBottom: '20px'}}>
        <input
          type='text'
          name='resourceName'
          placeholder='Resource Name'
          required
        />
        <input type='text' name='url' placeholder='URL' required />
        <input
          type='text'
          name='description'
          placeholder='Description'
          required
        />

        <button
          type='submit'
          className='btn blue-grey lighten-1'
          style={{ marginRight: '5px' }}
        >
          Create
        </button>
        <button
          type='button'
          className='btn blue-grey lighten-1'
          onClick={() => setCreatingNewResource((state) => !state)}
        >
          Cancel
        </button>
      </form>
    </>
  );
}

NewResourceForm.propTypes = {
  sectionId: PropTypes.string,
  setCreatingNewResource: PropTypes.func,
};

export default NewResourceForm;
