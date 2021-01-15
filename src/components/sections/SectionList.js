import React from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import {useFirestoreConnect, isLoaded } from 'react-redux-firebase';
import { Link, useHistory } from 'react-router-dom';

const listStyle = {
  marginLeft: '20px',
  cursor: 'pointer',
}

function SectionList({libraryId}) {
  const history = useHistory();
  useFirestoreConnect([
    { collection: 'libraries',  doc: libraryId, subcollections: [{collection: 'sections'}], storeAs: 'sections'},
  ]);

  const sections = useSelector(state => state.firestore.ordered.sections);

  if(isLoaded(sections)) {
    if (sections.length === 0) {
      return (
        <>
          <p>This library doesn't have any sections.</p>
        </>
      )
    } else {
      return (
        <>
          <hr/>
          {sections.map((section) => {
            return (
              <div onClick={() => history.push(`/library/${libraryId}/section/${section.id}`)} key={section.id}>
                <h4 className="section-list" style={listStyle}>{section.sectionName}</h4>
                <hr />
              </div>              
            )
          })}
        </>
      )
    }
  } else {
    return (
      <React.Fragment>
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
      </React.Fragment>
    )
  }
}

SectionList.propTypes = {
  libraryId: PropTypes.string
}

export default SectionList;