import {
  FETCH_BOOKCLUBS_SUCCESS,
  FETCH_BOOKCLUBSBY_ID_SUCCESS,
  PARTICIPANT_ADDED,
  COMMENT_ADDED_SUCCESS,
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
      // const thread = [...state.bookClubDetails.threads].filter((thread) => {
      //   return thread.id === threadId;
      // });
      // const thread = state.bookClubDetails.threads.find((thread) => {
      //   return thread.id === threadId;
      // });
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
      // console.log("thread", thread);
      // console.log("thread id", threadId);
      // console.log(comment);
      // const newThread = { ...thread, comments: [...thread.comments, comment] };
      // return {
      //   ...state,
      //   bookClubDetails: {
      //     ...state.bookClubDetails,
      //     threads: [...state.bookClubDetails.threads, newThread],
      //   },
      // };
    }
    default:
      return state;
  }
}
