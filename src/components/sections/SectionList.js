import React from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import {useFirestoreConnect, isLoaded } from 'react-redux-firebase';


function SectionList({libraryId, whenSectionClicked}) {
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
              // <div onClick = {() => whenSectionClicked(section.id)}>
              <div>
                <h2>{section.sectionName}</h2>
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
        <h3>Loading...</h3>
      </React.Fragment>
    )
  }
}

SectionList.propTypes = {
  libraryId: PropTypes.string,
  whenSectionClicked: PropTypes.func
}

export default SectionList;