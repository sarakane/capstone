import React from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { useFirestoreConnect, isLoaded } from 'react-redux-firebase';
import { selectLibrary, unselectLibrary } from '../../reducers/libraryReducer';

const listStyle = {
  marginLeft: '20px',
  cursor: 'pointer',
};

function LibraryList({ history }) {
  const dispatch = useDispatch();
  dispatch(unselectLibrary());
  useFirestoreConnect([{ collection: 'libraries' }]);

  const libraries = useSelector((state) => state.firestore.ordered.libraries);

  function handleLibrarySelection(library) {
    dispatch(selectLibrary(library.id));
    history.push(`/library/${library.id}`);
  }

  if (isLoaded(libraries)) {
    return (
      <>
        <h1 style={{display: 'inline-block'}}>Library List</h1>
        <button onClick={() => history.push('/create-library')} className="btn blue-grey lighten-1" style={{marginLeft: '20px', verticalAlign: 'super'}}>New Library</button>
        <hr />
        {libraries.map((library) => {
          return (
            <div
              onClick={() => handleLibrarySelection(library)}
              key={library.id}
            >
              <h3 style={listStyle} className='library-list'>
                {library.libraryName}
              </h3>
              <hr />
            </div>
          );
        })}
      </>
    );
  } else {
    return (
      <>
        <h1>Library List</h1>
        <hr />
        <div className='preloader-wrapper small active'>
          <div className='spinner-layer spinner-green-only'>
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
        <hr />
      </>
    );
  }
}

LibraryList.propTypes = {
  history: PropTypes.object,
};

export default LibraryList;
