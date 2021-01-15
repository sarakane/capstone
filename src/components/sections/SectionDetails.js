import React, { useState } from 'react';
import PropTypes from 'prop-types';
import EditSectionForm from './EditSectionForm';
import ResourceList from '../resources/ResourceList';
import { useDispatch, useSelector } from 'react-redux';
import { selectLibrary } from '../libraries/libraryReducer';
import { isLoaded, useFirestore, useFirestoreConnect } from 'react-redux-firebase';

const editButtonStyle = {
  marginRight: '5px'
};


function SectionDetails({ match }) {
  const [editing, setEditing] = useState(false);
  const dispatch = useDispatch();
  const fireStore = useFirestore();

  // if(!useSelector(state => state.library.selectedLibrary)) {
  //   dispatch(selectLibrary(match.params.id));
  // }

  useFirestoreConnect([
    { collection: 'libraries',  doc: match.params.id, subcollections: [{collection: 'sections', doc: match.params.id2}], storeAs: 'sections'},
  ]);
  

  const toggleEditSectionForm = () => {
    setEditing(!editing);
  }

  const section = useSelector(state => state.firestore.ordered.sections && state.firestore.ordered.sections.find(e => e.id === match.params.id2));

  if(isLoaded(section)) {
    return (
      <>
        <h1>Section</h1>
        {editing && <EditSectionForm section={section} setEditing={setEditing} />}
        {!editing && <h2>{section.sectionName}</h2>}
        <button onClick={toggleEditSectionForm} style={editButtonStyle} className="btn deep-purple darken-4">{!editing? "Edit": "Cancel"}</button>
        <button onClick={() => console.log('clicked')} className="btn deep-purple darken-4">Delete</button>
        <hr />
        <h3>Resources</h3>
        {/* <ResourceList sectionId={section.id} whenResourceClicked={whenResourceClicked} />
        <button onClick={onClickingNewResource} className="btn blue-grey lighten-1">New Resource</button>
        <hr /> */}
      </>
    );
  } else {
    return (
      <>
        <div className="preloader-wrapper small active">
          <div className="spinner-layer spinner-green">
            <div className="circle-clipper left">
              <div className="circle"></div>
            </div>
            <div className="gap-patch">
              <div className="circle"></div>
            </div>
            <div className="circle-clipper right">
              <div className="circle"></div>
            </div>
          </div>
        </div>
      </>
    )
  }

}

export default SectionDetails;