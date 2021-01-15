import React from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import {useFirestoreConnect, isLoaded } from 'react-redux-firebase';

const listStyle = {
  marginLeft: '20px',
  cursor: 'pointer',
}

function SectionList({libraryId}) {
  useFirestoreConnect([
    { collection: 'sections' }
  ]);

  const sections = useSelector(state => state.firestore.ordered.sections);

  if(isLoaded(sections)) {
    const displaySections = sections.filter(section => section.libraryId === libraryId);
    if (displaySections.length === 0) {
      return (
        <React.Fragment>
          <p>This library doesn't have any sections.</p>
        </React.Fragment>
      )
    } else {
      return (
        <React.Fragment>
          <hr/>
          {displaySections.map((section) => {
            return (
              <div onClick={() => console.log('clicked!')} key={section.id}>
                <h4 className="section-list" style={listStyle}>{section.sectionName}</h4>
                <hr/>
              </div>
              
            )
          })}
        </React.Fragment>
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