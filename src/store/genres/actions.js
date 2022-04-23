import axios from "axios";
import { apiUrl } from "../../config/constants";
import { appDoneLoading, appLoading } from "../appState/actions";

export const FETCHED_ALLGENRES = "FETCHED_ALLGENRES";

export const fetchGenreSuccess = (allGenres) => {
  return {
    type: FETCHED_ALLGENRES,
    payload: { allGenres },
  };
};

export const fetchAllGenres = () => {
  return async (dispatch, getState) => {
    dispatch(appLoading());
    try {
      const response = await axios.get(`${apiUrl}/genres`);
        // console.log(response.data);
      dispatch(fetchGenreSuccess(response.data));
    } catch (e) {
      console.log(e.message);
    }
    dispatch(appDoneLoading());
  };
};
