import React from 'react';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { isLoaded, useFirestore, useFirestoreConnect } from 'react-redux-firebase';
import EditResourceForm from './EditResourceForm';

function ResourceDetails({ match, history }) {
  const firestore = useFirestore();
  const [editingResource, setEditingResource] = useState(false);

  useFirestoreConnect([
    {
      collection: 'libraries',
      doc: match.params.id,
      subcollections: [{ collection: 'resources', doc: match.params.id3 }],
      storeAs: 'resources',
    },
  ]);

  const resource = useSelector(
    (state) =>
      state.firestore.ordered.resources &&
      state.firestore.ordered.resources.find((e) => e.id === match.params.id3)
  );

  function handleDeletingResource(resourceId) {
    history.push(`/library/${match.params.id}/section/${match.params.id2}`)
    firestore.delete({collection: 'libraries',
    doc: match.params.id,
    subcollections: [{ collection: 'resources', doc: resourceId }],})
  }

  if (isLoaded(resource)) {
    if (editingResource) {
      return (
        <EditResourceForm
          resource={resource}
          setEditingResource={setEditingResource}
          libraryId={match.params.id}
        />
      );
    } else {
      return (
        <>
          <h1>Resource</h1>
          <h2>{resource.resourceName}</h2>
          <button
            onClick={() => setEditingResource((state) => !state)}
            style={{ marginRight: '5px' }}
            className='btn deep-purple darken-4'
          >
            Edit
          </button>
          <button
            onClick={() => handleDeletingResource(resource.id)}
            className='btn deep-purple darken-4'
          >
            Delete
          </button>
          <hr />
          <a href={resource.url}>{resource.url}</a>
          <p>{resource.description}</p>
          <hr />
        </>
      );
    }
  } else {
    return <></>;
  }
}

export default ResourceDetails;