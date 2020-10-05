import React from 'react';
import { useSelector } from 'react-redux';
import {useFirestoreConnect, isLoaded } from 'react-redux-firebase';


function LibraryList() {

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
            <div>
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

export default LibraryList;