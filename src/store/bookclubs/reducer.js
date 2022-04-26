import {
  FETCH_BOOKCLUBS_SUCCESS,
  FETCH_BOOKCLUBSBY_ID_SUCCESS,
  PARTICIPANT_ADDED,
  COMMENT_ADDED_SUCCESS,
  THREAD_ADDED_SUCCESS,
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
    case COMMENT_ADDED_SUCCESS: {
      const { comment, threadId } = action.payload;
      const threads = state.bookClubDetails.threads.map((thread) => {
        if (thread.id !== threadId) return thread;

        return {
          ...thread,
          comments: [...thread.comments, comment],
        };
      });

      return {
        ...state,
        bookClubDetails: {
          ...state.bookClubDetails,
          threads: [...threads],
        },
      };
    }
    case THREAD_ADDED_SUCCESS: {
      const { newthread } = action.payload;
      console.log("in reducer",newthread);
      return {
        ...state,
        bookClubDetails: {
          ...state.bookClubDetails,
          threads: [...state.bookClubDetails.threads, newthread],
        },
      };
    }
    default:
      return state;
  }
}
