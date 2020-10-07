import React, { useState } from 'react';
import PropTypes from 'prop-types';
import EditSectionForm from './EditSectionForm';

const editButtonStyle = {
  marginRight: '5px'
};


function SectionDetail(props) {
  const { section, onClickingDelete} = props;
  const [editing, setEditing] = useState(false);

  const toggleEditSectionForm = () => {
    setEditing(!editing);
  }

  return (
    <React.Fragment>
      <h1>Section</h1>
      {editing && <EditSectionForm section={section} onEditSection={toggleEditSectionForm}/>}
      {!editing && <h2>{section.sectionName}</h2>}
      <button onClick={toggleEditSectionForm} style={editButtonStyle} className="btn cyan accent-4">{!editing? "Edit": "Cancel"}</button>
      <button onClick={() => onClickingDelete(section.id)} className="btn cyan accent-4">Delete</button>
      <hr />
      <h3>Resources</h3>
      {/* <button onClick={}>{addingSection ? "Cancel": "New Section"}</button> */}
      <hr />
    </React.Fragment>
  );
}

SectionDetail.propTypes = {
  section: PropTypes.object,
  onClickingDelete: PropTypes.func,
  onClickingEdit: PropTypes.func
};

export default SectionDetail;