import React from 'react';
import PropTypes from 'prop-types';

const editButtonStyle = {
  marginRight: '5px'
};


function SectionDetail(props) {
  const { section, onClickingDelete, onClickingEdit } = props;
  // const [addingSection, setAddingSection] = useState(false);

  // const toggleNewSectionForm = () => {
  //   setAddingSection(!addingSection);
  // }

  return (
    <React.Fragment>
      <h1>Section</h1>
      <h2>{section.sectionName}</h2>
      <button onClick={onClickingEdit} style={editButtonStyle} className="btn cyan accent-4">Edit</button>
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