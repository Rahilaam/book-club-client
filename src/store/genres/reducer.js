import { FETCHED_ALLGENRES, FETCHED_ALL_LANGUAGES } from "./actions";
const initialState = {
  allGenres: null,
  allLanguages: null,
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case FETCHED_ALLGENRES: {
      return {
        ...state,
        allGenres: action.payload.allGenres,
      };
    }
    case FETCHED_ALL_LANGUAGES: {
      return {
        ...state,
        allLanguages: action.payload.allLanguages,
      };
    }

    default:
      return state;
  }
}
