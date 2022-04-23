import { apiUrl } from "../../config/constants";
import axios from "axios";
import {
  appDoneLoading,
  appLoading,
  setMessage,
  showMessageWithTimeout,
} from "../appState/actions";
import { selectUser } from "../user/selectors";

export const FETCH_BOOKCLUBS_SUCCESS = "FETCH_BOOKCLUBS_SUCCESS";
export const FETCH_BOOKCLUBSBY_ID_SUCCESS = "FETCH_BOOKCLUBSBY_ID_SUCCESS";
export const PARTICIPANT_ADDED = "PARTICIPANT_ADDED";

export const fetched_bookclubs = (bookclubs) => {
  return {
    type: FETCH_BOOKCLUBS_SUCCESS,
    payload: { bookclubs },
  };
};

export const fetched_bookclubsbyId = (bookclubDetails) => {
  return {
    type: FETCH_BOOKCLUBSBY_ID_SUCCESS,
    payload: { bookclubDetails },
  };
};

export const participant_added = (newParticipant) => {
  return {
    type: PARTICIPANT_ADDED,
    payload: { newParticipant },
  };
};
export const fetchBookClubs = () => {
  return async (dispatch, getState) => {
    dispatch(appLoading());
    try {
      const response = await axios.get(`${apiUrl}/bookClubs`);
      //   console.log(response.data);
      dispatch(fetched_bookclubs(response.data));
    } catch (e) {
      console.log(e.message);
    }
    dispatch(appDoneLoading());
  };
};

export const fetchBookClubsById = (id) => {
  return async (dispatch, getState) => {
    dispatch(appLoading());
    try {
      const response = await axios.get(`${apiUrl}/bookClubs/${id}`);
      const apiData = await axios.get(
        `https://www.googleapis.com/books/v1/volumes/${response.data.apiId}`
      );
      const bookClubDetails = {
        ...response.data,
        ...apiData.data.volumeInfo,
        language: response.data.language,
      };
      // console.log(bookClubDetails);
      dispatch(fetched_bookclubsbyId(bookClubDetails));
    } catch (e) {
      console.log(e.message);
    }
    dispatch(appDoneLoading());
  };
};
export const addParticipant = (bookClubid) => {
  console.log(`inside action thunk`);
  return async (dispatch, getState) => {
    const { token } = selectUser(getState());
    console.log(token, typeof token);
    const headers = { Authorization: `Bearer ${token}` };
    console.log(headers);
    dispatch(appLoading());
    try {
      // console.log(bookClubDetails);
      const newParticipant = await axios.post(
        `${apiUrl}/bookClubs/${bookClubid}/join`,
        { data: "" },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      console.log(newParticipant.data);
      dispatch(participant_added(newParticipant.data));
      dispatch(showMessageWithTimeout("success", true, "account created"));
    } catch (e) {
      dispatch(setMessage("danger", true, e.response.data.message));
      console.log(e.message);
    }
    dispatch(appDoneLoading());
  };
};
