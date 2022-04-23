import { FETCHED_ALLGENRES } from "./actions";
const initialState = {
  allGenres: null,
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case FETCHED_ALLGENRES: {
      return {
        ...state,
        allGenres: action.payload.allGenres,
      };
    }
    default:
      return state;
  }
}
