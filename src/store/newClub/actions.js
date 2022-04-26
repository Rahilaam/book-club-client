import axios from "axios";
import { appDoneLoading, appLoading } from "../appState/actions";
export const SEARTCH_RESULT = "SEARTCH_RESULT";
export const fetched_from_API = (books) => {
  return {
    type: SEARTCH_RESULT,
    payload: { books },
  };
};

export const seartchForBooks = (title) => {
  return async (dispatch, getState) => {
    // dispatch(appLoading());
    try {
      const response = await axios.get(
        `https://www.googleapis.com/books/v1/volumes?q=${title}`
      );
        // console.log(response.data);
      dispatch(fetched_from_API(response.data));
    } catch (e) {
      console.log(e.message);
    }
    // dispatch(appDoneLoading());
  };
};
