import { combineReducers } from 'redux';
import { firestoreReducer } from 'redux-firestore';
import libraryReducer from '../components/libraries/libraryReducer';

const rootReducer = combineReducers({
  firestore: firestoreReducer,
  library: libraryReducer
});

export default rootReducer;