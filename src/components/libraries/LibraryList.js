import React from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import {useFirestoreConnect, isLoaded } from 'react-redux-firebase';


function LibraryList(props) {

  useFirestoreConnect([
    { collection: 'libraries' }
  ]);

  const libraries = useSelector(state => state.firestore.ordered.libraries);

  if(isLoaded(libraries)) {
    return (
      <React.Fragment>
        <hr/>
        {libraries.map((library) => {
          return (
            <div onClick = {() => props.whenLibraryClicked(library.id)}>
              <h2>{library.libraryName}</h2>
              <hr/>
            </div>
            
          )
        })}
      </React.Fragment>
    )
  } else {
    return (
      <React.Fragment>
        <h3>Loading...</h3>
      </React.Fragment>
    )
  }
}

LibraryList.propTypes = {
  whenLibraryClicked: PropTypes.func
}

export default LibraryList;