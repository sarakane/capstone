import React from 'react';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import {
  isLoaded,
  useFirestore,
  useFirestoreConnect,
} from 'react-redux-firebase';
import { useHistory, useParams } from 'react-router-dom';
import EditResourceForm from './EditResourceForm';

function ResourceDetails() {
  const firestore = useFirestore();
  const { id, id2, id3 } = useParams();
  const history = useHistory();
  const auth = useSelector((state) => state.firebase.auth);
  const [editingResource, setEditingResource] = useState(false);

  useFirestoreConnect([
    {
      collection: 'libraries',
      doc: id,
      subcollections: [{ collection: 'resources', doc: id3 }],
      storeAs: 'resources',
    },
    {
      collection: 'libraries',
      doc: id,
    },
  ]);

  const resource = useSelector(
    (state) =>
      state.firestore.ordered.resources &&
      state.firestore.ordered.resources.find((e) => e.id === id3)
  );

  const library = useSelector(
    (state) =>
      state.firestore.ordered.libraries &&
      state.firestore.ordered.libraries.find((e) => e.id === id)
  );

  function handleDeletingResource(resourceId) {
    history.push(`/library/${id}/section/${id2}`);
    firestore.delete({
      collection: 'libraries',
      doc: id,
      subcollections: [{ collection: 'resources', doc: resourceId }],
    });
  }

  if (isLoaded(resource) && isLoaded(library)) {
    if (editingResource) {
      return (
        <EditResourceForm
          resource={resource}
          setEditingResource={setEditingResource}
          libraryId={id}
        />
      );
    } else {
      return (
        <>
          <a className="waves-effect waves-light btn-small" href={`/library/${id}/section/${id2}`}><i className="material-icons left">arrow_back</i>Section</a>
          <h1>Resource</h1>
          <h2>{resource.resourceName}</h2>
          {!auth.isEmpty && auth.uid === library.creatorId && (
            <>
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
            </>
          )}
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
