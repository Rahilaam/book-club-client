import axios from "axios";
import { apiUrl } from "../../config/constants";
import { appDoneLoading, appLoading } from "../appState/actions";

export const FETCHED_ALLGENRES = "FETCHED_ALLGENRES";
export const FETCHED_ALL_LANGUAGES = "FETCHED_ALLLANGUAGES";

export const fetchGenreSuccess = (allGenres) => {
  return {
    type: FETCHED_ALLGENRES,
    payload: { allGenres },
  };
};
export const fetchLanguageSuccess = (allLanguages) => {
  return {
    type: FETCHED_ALL_LANGUAGES,
    payload: { allLanguages },
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

export const fetchAllLanguages = () => {
  return async (dispatch, getState) => {
    dispatch(appLoading());
    try {
      const response = await axios.get(`${apiUrl}/languages`);
      // console.log(response.data);
      dispatch(fetchLanguageSuccess(response.data));
    } catch (e) {
      console.log(e.message);
    }
    dispatch(appDoneLoading());
  };
};
