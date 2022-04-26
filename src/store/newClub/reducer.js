import { SEARTCH_RESULT } from "./actions";

const initialState = {
  searchResult: null,
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case SEARTCH_RESULT: {
      return {
        ...state,
        searchResult: action.payload.books,
      };
    }
    default:
      return state;
  }
}
