import { SELECT_LIBRARY, UNSELECT_LIBRARY } from "./libraryConstants";

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