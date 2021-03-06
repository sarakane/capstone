import React, { useState } from 'react';
import PropTypes from 'prop-types';
import SectionList from '../sections/SectionList';
import NewSectionForm from '../sections/NewSectionForm';
import { useDispatch, useSelector } from 'react-redux';
import {
  isLoaded,
  useFirestore,
  useFirestoreConnect,
} from 'react-redux-firebase';
import { selectLibrary } from '../../reducers/libraryReducer';
import { useHistory, useParams } from 'react-router-dom';

function LibraryDetail() {
  const history = useHistory();
  const { id } = useParams();
  const [addingSection, setAddingSection] = useState(false);
  const firestore = useFirestore();
  const dispatch = useDispatch();

  useFirestoreConnect([
    { collection: 'libraries', doc: id },
    {
      collection: 'libraries',
      doc: id,
      subcollections: [{ collection: 'resources' }],
      storeAs: 'resources',
    },
  ]);
  const library = useSelector(
    (state) =>
      state.firestore.ordered.libraries &&
      state.firestore.ordered.libraries.find((e) => e.id === id)
  );

  const auth = useSelector((state) => state.firebase.auth);

  const sectionsForLibrary = useSelector(
    (state) => state.firestore.ordered.sections
  );
  const resourcesForLibrary = useSelector(
    (state) => state.firestore.ordered.resources
  );

  function deleteLibrary(libraryId) {
    sectionsForLibrary.forEach((section) =>
      firestore.delete({
        collection: 'libraries',
        doc: libraryId,
        subcollections: [{ collection: 'sections', doc: section.id }],
      })
    );
    resourcesForLibrary.forEach((resource) =>
      firestore.delete({
        collection: 'libraries',
        doc: libraryId,
        subcollections: [{ collection: 'resources', doc: resource.id }],
      })
    );
    firestore.delete({ collection: 'libraries', doc: libraryId });
    return history.push('/home');
  }

  if (!useSelector((state) => state.library.selectedLibrary)) {
    dispatch(selectLibrary(library));
  }

  if (isLoaded(library)) {
    return (
      <>
        <a
          className="waves-effect waves-light btn-small blue-grey lighten-1'"
          href={`/home`}
        >
          <i className='material-icons left'>arrow_back</i>Library List
        </a>
        <h1>Library / {library.libraryName}</h1>
        {!auth.isEmpty && auth.uid === library.creatorId && (
          <>
            <button
              onClick={() => history.push(`/library/${library.id}/edit`)}
              className='btn blue-grey lighten-1'
              style={{ marginRight: '5px' }}
            >
              Edit
            </button>
            <button
              onClick={() => deleteLibrary(id)}
              className='btn red darken-4'
            >
              Delete
            </button>
          </>
        )}
        <hr />
        <ul className='collection with-header'>
          <li className='collection-header'>
            <h3 style={{ display: 'inline-block', marginRight: '20px' }}>
              Sections
            </h3>
            {!addingSection && !auth.isEmpty && auth.uid === library.creatorId && (
              <button
                onClick={() => setAddingSection((state) => !state)}
                className='btn blue-grey lighten-1'
                style={{ verticalAlign: 'super' }}
              >
                New Section
              </button>
            )}
          </li>
          {addingSection && (
            <NewSectionForm
              setAddingSection={setAddingSection}
              libraryId={library.id}
            />
          )}
          <SectionList libraryId={library.id} />
        </ul>
      </>
    );
  } else {
    return <div></div>;
  }
}

LibraryDetail.propTypes = {
  match: PropTypes.object,
};

export default LibraryDetail;
