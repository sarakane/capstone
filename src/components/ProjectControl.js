import React from 'react';
import { connect } from 'react-redux';
import { withFirestore } from 'react-redux-firebase';
import NewLibraryForm from './libraries/NewLibraryForm';
import EditLibraryForm from './libraries/EditLibraryForm';
import LibraryList from './libraries/LibraryList';
import LibraryDetail from './libraries/LibraryDetail';
import SectionDetails from './sections/SectionDetails';
import ResourceDetails from './resources/ResourceDetails';

class ProjectControl extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      formVisibleOnPage: false,
      editingLibrary: false,
      selectedLibrary: null,
      selectedSection: null,
      selectedResource: null
    };
  }

  handleClick = () =>{
    if(this.state.selectedSection != null) {
      this.setState({
        selectedSection: null,
        editingLibrary: false
      });
    } else if (this.state.selectedLibrary != null) {
      this.setState({
        selectedLibrary: null,
        editingLibrary: false
      });
    } else {
      this.setState(prevState => ({
          formVisibleOnPage: !prevState.formVisibleOnPage
      }));}
  }

  handleAddingNewLibraryToList = () => {
      this.setState(prevState => ({
        formVisibleOnPage: !prevState.formVisibleOnPage
      }));
  }
  
  handleChangingSelectedLibrary = (id) => {
    this.props.firestore.get({collection: 'libraries', doc: id}).then((library) => {
      const firestoreLibrary = {
        libraryName: library.get("libraryName"),
        creatorId: library.get("creatorId"),
        id: library.id
      }
      this.setState({selectedLibrary: firestoreLibrary });
    })
  }

  handleChangingSelectedSection = (id) => {
    this.props.firestore.get({collection: 'sections', doc: id}).then((section) => {
      const firestoreSection = {
        sectionName: section.get("sectionName"),
        libraryId: section.get("libraryId"),
        creatorId: section.get("creatorId"),
        id: section.id
      }
      this.setState({
        selectedSection: firestoreSection
      });
    })
  }

  handleDeletingLibrary = (id) => {
    this.props.firestore.delete({ collection: 'libraries', doc: id });
    this.setState({ selectedLibrary: null });
  }

  handleEditClick = () => {
    this.setState({editingLibrary: true});
  }

  handleEditingLibrary = () => {
    this.setState({
      editingLibrary: false,
      selectedLibrary: null
    });
  } 

  handleDeletingSection = (id) => {
    this.props.firestore.delete({ collection: 'sections', doc: id });
    this.setState({ selectedSection: null });
  }

  handleChangingSelectedResource = (id) => {
    this.props.firestore.get({collection: 'resources', doc: id}).then((resource) => {
      const firestoreResource = {
        resourceName: resource.get("resourceName"),
        url: resource.get("url"),
        description: resource.get("description"),
        sectionId: resource.get("sectionId"),
        creatorId: resource.get("creatorId"),
        id: resource.id
      }
      this.setState({
        selectedResource: firestoreResource
      });
    })
  }

  render() {
    let currentlyVisibleState = null;
    let buttonText = null;
    if(this.state.editingLibrary) {
      currentlyVisibleState = <EditLibraryForm library={this.state.selectedLibrary} onEditLibrary={this.handleEditingLibrary} />
      buttonText = "Return to Library List";
    } else if (this.state.selectedResource != null) {
      currentlyVisibleState = <ResourceDetails resource={this.state.selectedResource}
                                onClickingDelete={this.handleDeletingResource}
                                onClickingEdit={this.handleEditingResource} />
      buttonText = "Return to Section"
    } else if (this.state.selectedSection != null){
      currentlyVisibleState = <SectionDetails section={this.state.selectedSection} 
                                onClickingDelete={this.handleDeletingSection}
                                whenResourceClicked={this.handleChangingSelectedResource} 
                                />
      buttonText = "Return";
    } else if (this.state.selectedLibrary != null) {
      currentlyVisibleState = <LibraryDetail library={this.state.selectedLibrary} 
                                onClickingDelete={this.handleDeletingLibrary}  
                                onClickingEdit={this.handleEditClick}
                                whenSectionClicked={this.handleChangingSelectedSection}/>
      buttonText = "Return to Library List";
    } else if (this.state.formVisibleOnPage) {
      currentlyVisibleState = <NewLibraryForm onNewLibraryCreation={this.handleAddingNewLibraryToList} />
      buttonText = "Return to Library List";
    } else {
      currentlyVisibleState = <LibraryList whenLibraryClicked={this.handleChangingSelectedLibrary}/>;
      buttonText = "Add Library";
    }
    return (
      <React.Fragment>
        {currentlyVisibleState}
        <button onClick={this.handleClick} className="btn cyan accent-4">{buttonText}</button>
      </React.Fragment>
    );
  }
}


ProjectControl = connect()(ProjectControl);

export default withFirestore(ProjectControl);