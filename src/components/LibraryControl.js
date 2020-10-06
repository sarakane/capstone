import React from 'react';
import { connect } from 'react-redux';
import { withFirestore } from 'react-redux-firebase';
import NewLibraryForm from './libraries/NewLibraryForm';
import EditLibraryForm from './libraries/EditLibraryForm';
import LibraryList from './libraries/LibraryList';
import LibraryDetail from './libraries/LibraryDetail';

class LibraryControl extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      formVisibleOnPage: false,
      editing: false,
      selectedLibrary: null
    };
  }

  handleClick = () =>{
    if (this.state.selectedLibrary != null) {
      this.setState({
        selectedLibrary: null,
        editing: false
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

  handleDeletingLibrary = (id) => {
    this.props.firestore.delete({ collection: 'libraries', doc: id });
    this.setState({ selectedLibrary: null });
  }

  handleEditClick = () => {
    this.setState({editing: true});
  }

  handleEditingLibrary = () => {
    this.setState({
      editing: false,
      selectedLibrary: null
    });
  } 

  render() {
    let currentlyVisibleState = null;
    let buttonText = null;
    if(this.state.editing) {
      currentlyVisibleState = <EditLibraryForm library={this.state.selectedLibrary} onEditLibrary={this.handleEditingLibrary} />
      buttonText = "Return to Ticket List";
    } else if (this.state.selectedLibrary !=null) {
      currentlyVisibleState = <LibraryDetail library={this.state.selectedLibrary} onClickingDelete={this.handleDeletingLibrary}  onClickingEdit={this.handleEditClick}/>
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
        <button onClick={this.handleClick}>{buttonText}</button>
      </React.Fragment>
    );
  }
}

// const mapStateToProps = state => {
//   return {}
// }

// LibraryControl = connect(mapStateToProps)(LibraryControl);
LibraryControl = connect()(LibraryControl);

export default withFirestore(LibraryControl);