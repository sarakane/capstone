import React from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { useFirestoreConnect, isLoaded } from 'react-redux-firebase';
import { selectLibrary, unselectLibrary } from '../../reducers/libraryReducer';
import { useHistory } from 'react-router-dom';

const listStyle = {
  cursor: 'pointer',
  fontSize: '24px'
};

function LibraryList() {
  const dispatch = useDispatch();
  const history = useHistory();
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
        <ul className='collection with-header'>
          <li className='collection-header'>
            <h1 style={{ display: 'inline-block' }}>Library List</h1>
            <button
              onClick={() => history.push('/create-library')}
              className='btn blue-grey lighten-1'
              style={{ marginLeft: '20px', verticalAlign: 'super' }}
            >
              New Library
            </button>
          </li>
          {libraries.map((library) => {
            return (
              <li
                className='collection-item library-list'
                onClick={() => handleLibrarySelection(library)}
                style={listStyle}
                key={library.id}
              >
                {library.libraryName}
              </li>
            );
          })}
        </ul>
      </>
    );
  } else {
    return (
      <>
        <ul className='collection with-header'>
          <li className='collection-header'>
        <h1>Library List</h1></li>
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
        </ul>
      </>
    );
  }
}

LibraryList.propTypes = {
  history: PropTypes.object,
};

export default LibraryList;
