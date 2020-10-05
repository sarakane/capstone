import React from 'react';
import { connect } from 'react-redux';
import { withFirestore, isLoaded } from 'react-redux-firebase';
import NewLibraryForm from './NewLibraryForm';
import LibraryList from './LibraryList';

class LibraryControl extends React.Component {
  constructor() {
    super();
    this.state = {
      formVisibleOnPage: false
    };
  }

  render() {
    let currentlyVisibleState = null;
    let buttonText = null;
    if (this.state.formVisibleOnPage) {
      currentlyVisibleState = <NewLibraryForm />
      buttonText = "Return to Library List";
    } else {
      currentlyVisibleState = <LibraryList />;
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
//   return {
    
//   }
// }

// LibraryControl = connect(mapStateToProps)(LibraryControl);

export default LibraryControl;