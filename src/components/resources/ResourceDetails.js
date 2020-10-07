import React from 'react';
import PropTypes from 'prop-types';

const editButtonStyle = {
  marginRight: '5px'
};


function ResourceDetails({ resource, onClickingDelete, onClickingEdit} ) {

  return (
    <React.Fragment>
      <h1>Resource</h1>
      <h2>{resource.resourceName}</h2>
      <button onClick={onClickingEdit} style={editButtonStyle} className="btn cyan accent-4">Edit</button>
      <button onClick={() => onClickingDelete(resource.id)} className="btn cyan accent-4">Delete</button>
      <hr />
      <a href={resource.url}>{resource.url}</a>
      <p>{resource.description}</p>
      <hr />
    </React.Fragment>
  );
}

ResourceDetails.propTypes = {
  resource: PropTypes.object,
  onClickingDelete: PropTypes.func,
  onClickingEdit: PropTypes.func
};

export default ResourceDetails;