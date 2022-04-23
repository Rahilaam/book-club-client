import {
  FETCH_BOOKCLUBS_SUCCESS,
  FETCH_BOOKCLUBSBY_ID_SUCCESS,
  PARTICIPANT_ADDED,
} from "./actions";

const initialState = {
  allBookClubs: [],
  bookClubDetails: null,
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case FETCH_BOOKCLUBS_SUCCESS: {
      return {
        ...state,
        allBookClubs: action.payload.bookclubs,
      };
    }

    case FETCH_BOOKCLUBSBY_ID_SUCCESS: {
      // console.log("this action is called",action.payload.bookclubDetails);
      return {
        ...state,
        bookClubDetails: action.payload.bookclubDetails,
      };
    }

    case PARTICIPANT_ADDED: {
      return {
        ...state,
        bookClubDetails: {
          ...state.bookClubDetails,
          participant: [
            ...state.bookClubDetails.participant,
            action.payload.newParticipant,
          ],
        },
      };
    }

    default:
      return state;
  }
}
