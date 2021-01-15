import React from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { useFirestoreConnect, isLoaded } from 'react-redux-firebase';
import { useHistory, useParams } from 'react-router-dom';

const listStyle = {
  marginLeft: '20px',
  cursor: 'pointer',
};

function ResourceList({ sectionId }) {
  let { id } = useParams();
  const history = useHistory();
  useFirestoreConnect([
    {
      collection: 'libraries',
      doc: id,
      subcollections: [
        { collection: 'resources', where: ['sectionId', '==', sectionId] },
      ],
      storeAs: 'resources',
    },
  ]);

  const resources = useSelector((state) => state.firestore.ordered.resources);
  if (isLoaded(resources)) {
    if (resources.length === 0) {
      return (
        <>
          <p>This section doesn't have any resources.</p>
        </>
      );
    } else {
      return (
        <>
          <hr />
          {resources.map((resource) => {
            return (
              <div
                onClick={() =>
                  history.push(
                    `/library/${id}/section/${sectionId}/resource/${resource.id}`
                  )
                }
                key={resource.id}
              >
                <h4 className='resource-list' style={listStyle}>
                  {resource.resourceName}
                </h4>
                <hr />
              </div>
            );
          })}
        </>
      );
    }
  } else {
    return (
      <>
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
      </>
    );
  }
}

ResourceList.propTypes = {
  sectionId: PropTypes.string,
};

export default ResourceList;
