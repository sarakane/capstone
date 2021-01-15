import React, { useState } from 'react';
import PropTypes from 'prop-types';
import SectionList from '../sections/SectionList';
import NewSectionForm from '../sections/NewSectionForm';
import { useDispatch, useSelector } from 'react-redux';
import { isLoaded, useFirestore, useFirestoreConnect } from 'react-redux-firebase';
import { selectLibrary } from './libraryActions';

function LibraryDetail({ match, history }) {
  const [addingSection, setAddingSection] = useState(false);
  const firestore = useFirestore();
  const dispatch = useDispatch();
  dispatch(selectLibrary(match.params.id));

  useFirestoreConnect([{ collection: 'libraries', doc: match.params.id }]);
  const library = useSelector(
    (state) =>
      state.firestore.ordered.libraries && state.firestore.ordered.libraries.find(e => e.id === match.params.id)
  );

  function deleteLibrary(libraryId) {
    firestore.delete({ collection: 'libraries', doc: libraryId });
    return history.push('/home');
  }

  if (isLoaded(library)) {
    return (
      <React.Fragment>
        <h1>Library</h1>
        <h2>{library.libraryName}</h2>
        <button
          onClick={() => history.push(`/library/${library.id}/edit`)}
          className='btn deep-purple darken-4'
          style={{marginRight: '5px'}}
        >
          Edit
        </button>
        <button
          onClick={() => deleteLibrary(match.params.id)}
          className='btn deep-purple darken-4'
        >
          Delete
        </button>
        <hr />
        <h3>Sections</h3>
        <SectionList
          libraryId={library.id}
        />
        {/* {addingSection && (
          <NewSectionForm
            onNewSectionCreation={toggleNewSectionForm}
            libraryId={library.id}
          />
        )} */}
        <button
          onClick={() => setAddingSection(state => !state)}
          className='btn blue-grey lighten-1'
        >
          {addingSection ? 'Cancel' : 'New Section'}
        </button>
        <hr />
      </React.Fragment>
    );
  } else {
    return <div></div>;
  }
}

LibraryDetail.propTypes = {
  match: PropTypes.object,
};

export default LibraryDetail;
