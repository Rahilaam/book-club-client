import { combineReducers } from "redux";
import appState from "./appState/reducer";
import user from "./user/reducer";
import bookClubs from "./bookclubs/reducer";
import genre from "./genres/reducer";
export default combineReducers({
  appState,
  user,
  bookClubs,
  genre,
});
