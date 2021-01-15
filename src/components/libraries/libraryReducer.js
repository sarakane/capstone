const SELECT_LIBRARY = 'SELECT_LIBRARY';
const UNSELECT_LIBRARY = 'UNSELECT_LIBRARY'; 

export function selectLibrary(payload) {
  return {
    type: SELECT_LIBRARY,
    payload
  }
}

export function unselectLibrary() {
  return  {
    type: UNSELECT_LIBRARY
  }
}

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
