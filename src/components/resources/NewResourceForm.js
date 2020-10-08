import React from 'react';
import PropTypes from 'prop-types';
import { useFirestore } from 'react-redux-firebase';

const addMargin = {
  marginBottom: '5px'
}

function NewResourceForm(props) {
  const firestore = useFirestore();

  function addResourceToFirestore(event) {
    event.preventDefault();

    props.onNewResourceCreation();

    return firestore.collection('resources').add(
      {
        resourceName: event.target.resourceName.value,
        url: event.target.url.value,
        description: event.target.description.value,
        sectionId: props.sectionId,
        creatorId: "apple1"
      }
    );
  }

  return (
    <React.Fragment>
      <form onSubmit={addResourceToFirestore}>
        <input
          type='text'
          name='resourceName'
          placeholder='Resource Name' 
          required />
          <input
          type='text'
          name='url'
          placeholder='URL' 
          required />
          <input
          type='text'
          name='description'
          placeholder='Description' 
          required />

        <button type='submit' className="btn pink lighten-2" style={addMargin}>Create</button>
      </form>
    </React.Fragment>
  )
}

NewResourceForm.propTypes = {
  onNewResourceCreation: PropTypes.func,
  sectionId:  PropTypes.string
}

export default NewResourceForm;