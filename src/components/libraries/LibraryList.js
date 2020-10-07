import React from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import {useFirestoreConnect, isLoaded } from 'react-redux-firebase';

const listStyle = {
  marginLeft: '20px',
  cursor: 'pointer',
  hover: {
    color: 'blue'
  }  
}

function LibraryList(props) {

  useFirestoreConnect([
    { collection: 'libraries' }
  ]);

  const libraries = useSelector(state => state.firestore.ordered.libraries);

  if(isLoaded(libraries)) {
    return (
      <React.Fragment>
        <h1>Library List</h1>
        <hr/>
        {libraries.map((library) => {
          return (
            <div onClick={() => props.whenLibraryClicked(library.id)}>
              <h3 style={listStyle} className="library-list">{library.libraryName}</h3>
              <hr/>
            </div>
            
          )
        })}
      </React.Fragment>
    )
  } else {
    return (
      <React.Fragment>
        <h1>Library List</h1>
        <hr/> 
        <div class="preloader-wrapper small active">
          <div class="spinner-layer spinner-green-only">
            <div class="circle-clipper left">
              <div class="circle"></div>
            </div><div class="gap-patch">
              <div class="circle"></div>
            </div><div class="circle-clipper right">
              <div class="circle"></div>
            </div>
          </div>
        </div>
        <hr/>
      </React.Fragment>
    )
  }
}

LibraryList.propTypes = {
  whenLibraryClicked: PropTypes.func
}

export default LibraryList;