import React from 'react';
import PropTypes from 'prop-types';

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
      <button onClick={onClickingEdit}>Edit</button>
      <button onClick={() => onClickingDelete(section.id)}>Delete</button>
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