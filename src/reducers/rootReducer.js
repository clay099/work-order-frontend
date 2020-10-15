import { combineReducers } from "redux";
import login from "./login";
import projects from "./projects";
import feedback from "./feedback";
import user from "./user";
import bids from "./bids";
import reviews from "./reviews";

/**
 * rootReducer combines all reducers
 */
export default combineReducers({
	login,
	projects,
	feedback,
	user,
	bids,
	reviews,
});
