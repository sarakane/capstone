import React, { useState } from 'react';
import EditSectionForm from './EditSectionForm';
import ResourceList from '../resources/ResourceList';
import { useSelector } from 'react-redux';
import {
  isLoaded,
  useFirestore,
  useFirestoreConnect,
} from 'react-redux-firebase';
import NewResourceForm from '../resources/NewResourceForm';

function SectionDetails({ match, history }) {
  const [editing, setEditing] = useState(false);
  const [creatingNewResource, setCreatingNewResource] = useState(false);
  const firestore = useFirestore();

  useFirestoreConnect([
    {
      collection: 'libraries',
      doc: match.params.id,
      subcollections: [{ collection: 'sections', doc: match.params.id2 }],
      storeAs: 'sections',
    },
  ]);

  const section = useSelector(
    (state) =>
      state.firestore.ordered.sections &&
      state.firestore.ordered.sections.find((e) => e.id === match.params.id2)
  );
  const sectionResources = useSelector(
    (state) => state.firestore.ordered.resources
  );

  function handleDeletingSection(sectionId) {
    sectionResources.forEach((resource) =>
      firestore.delete({
        collection: 'libraries',
        doc: match.params.id,
        subcollections: [{ collection: 'resources', doc: resource.id }],
      })
    );
    firestore.delete({
      collection: 'libraries',
      doc: match.params.id,
      subcollections: [{ collection: 'sections', doc: sectionId }],
    });
    history.push(`/library/${match.params.id}`);
  }

  if (isLoaded(section)) {
    return (
      <>
        <h1>Section</h1>
        {editing && (
          <EditSectionForm section={section} setEditing={setEditing} />
        )}
        {!editing && <h2>{section.sectionName}</h2>}
        <button
          onClick={() => setEditing((state) => !state)}
          style={{ marginRight: '5px' }}
          className='btn deep-purple darken-4'
        >
          {!editing ? 'Edit' : 'Cancel'}
        </button>
        <button
          onClick={() => handleDeletingSection(section.id)}
          className='btn deep-purple darken-4'
        >
          Delete
        </button>
        <hr />
        <h3>Resources</h3>
        <ResourceList sectionId={section.id} />
        {!creatingNewResource && (
          <button
            onClick={() => setCreatingNewResource((state) => !state)}
            className='btn blue-grey lighten-1'
          >
            New Resource
          </button>
        )}
        {creatingNewResource && (
          <NewResourceForm
            sectionId={section.id}
            setCreatingNewResource={setCreatingNewResource}
          />
        )}
      </>
    );
  } else {
    return (
      <>
        <div className='preloader-wrapper small active'>
          <div className='spinner-layer spinner-green'>
            <div className='circle-clipper left'>
              <div className='circle'></div>
            </div>
            <div className='gap-patch'>
              <div className='circle'></div>
            </div>
            <div className='circle-clipper right'>
              <div className='circle'></div>
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default SectionDetails;
