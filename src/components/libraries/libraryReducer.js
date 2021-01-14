import { SELECT_LIBRARY, UNSELECT_LIBRARY } from './libraryConstants';

const initialState = {
  selectedLibrary: null,
};

export default function libraryReducer(
  state = initialState,
  { type, payload }
) {
  switch (type) {
    case SELECT_LIBRARY:
      return {
        ...state,
        selectedLibrary: payload,
      };
    case UNSELECT_LIBRARY:
      return {
        ...state,
        selectedLibrary: null,
      };
    default:
      return state;
  }
}
