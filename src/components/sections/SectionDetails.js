import React, { useState } from 'react';
import PropTypes from 'prop-types';
import EditSectionForm from './EditSectionForm';
import ResourceList from '../resources/ResourceList';

const editButtonStyle = {
  marginRight: '5px'
};


function SectionDetails({ section, onClickingDelete, whenResourceClicked, onClickingNewResource}) {
  const [editing, setEditing] = useState(false);
  const [sectionName, setSectionName] = useState(section.sectionName);

  const toggleEditSectionForm = () => {
    setEditing(!editing);
  }


  return (
    <React.Fragment>
      <h1>Section</h1>
      {editing && <EditSectionForm section={section} onEditSection={toggleEditSectionForm} setSectionName={setSectionName}/>}
      {!editing && <h2>{sectionName}</h2>}
      <button onClick={toggleEditSectionForm} style={editButtonStyle} className="btn cyan accent-4">{!editing? "Edit": "Cancel"}</button>
      <button onClick={() => onClickingDelete(section.id)} className="btn cyan accent-4">Delete</button>
      <hr />
      <h3>Resources</h3>
      <ResourceList sectionId={section.id} whenResourceClicked={whenResourceClicked} />
      <button onClick={onClickingNewResource} className="btn pink lighten-2">New Resource</button>
      <hr />
    </React.Fragment>
  );
}

SectionDetails.propTypes = {
  section: PropTypes.object,
  onClickingDelete: PropTypes.func,
  whenResourceClicked: PropTypes.func,
  oonClickingNewResource: PropTypes.func
};

export default SectionDetails;