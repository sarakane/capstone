import React from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import {useFirestoreConnect, isLoaded } from 'react-redux-firebase';
import { useParams } from 'react-router-dom';

const listStyle = {
  marginLeft: '20px',
  cursor: 'pointer',
}

function ResourceList({sectionId}) {
  let { id } = useParams();
  useFirestoreConnect([
    { collection: 'libraries', doc: id, subcollections: [{collection: 'resources', where: ['sectionId', '==', sectionId]}],  storeAs: 'resources' }
  ]);

  const resources = useSelector(state => state.firestore.ordered.resources);
  if(isLoaded(resources)) {
    const displayResources = resources.filter(resource => resource.sectionId === sectionId);
    if (displayResources.length === 0) {
      return (
        <React.Fragment>
          <p>This section doesn't have any resources.</p>
        </React.Fragment>
      )
    } else {
      return (
        <React.Fragment>
          <hr/>
          {displayResources.map((resource) => {
            return (
              <div onClick={() => console.log('resource clicked')} key={resource.id}>
                <h4 className="resource-list" style={listStyle}>{resource.resourceName}</h4>
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

ResourceList.propTypes = {
  sectionId: PropTypes.string
}

export default ResourceList;