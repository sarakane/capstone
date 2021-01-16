import React from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { useFirestoreConnect, isLoaded } from 'react-redux-firebase';
import { useHistory } from 'react-router-dom';

function SectionList({ libraryId }) {
  const history = useHistory();
  useFirestoreConnect([
    {
      collection: 'libraries',
      doc: libraryId,
      subcollections: [{ collection: 'sections' }],
      storeAs: 'sections',
    },
  ]);

  const sections = useSelector((state) => state.firestore.ordered.sections);

  if (isLoaded(sections)) {
    if (sections.length === 0) {
      return (
        <>
          <p>This library doesn't have any sections.</p>
        </>
      );
    } else {
      return (
        <>
          {sections.map((section) => {
            return (
              <li className='collection-item' key={section.id}>
                <div
                  onClick={() =>
                    history.push(`/library/${libraryId}/section/${section.id}`)
                  }
                >
                  <h5 className='section-list' style={{cursor: 'pointer'}}>
                    {section.sectionName}
                  </h5>
                </div>
              </li>
            );
          })}
        </>
      );
    }
  } else {
    return (
      <React.Fragment>
        <div className='preloader-wrapper small active'>
          <div className='spinner-layer spinner-green'>
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
      </React.Fragment>
    );
  }
}

SectionList.propTypes = {
  libraryId: PropTypes.string,
};

export default SectionList;
