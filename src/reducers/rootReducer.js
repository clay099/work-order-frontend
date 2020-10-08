import { combineReducers } from "redux";
import login from "./login";
import projects from "./projects";
import feedback from "./feedback";

export default combineReducers({ login, projects, feedback });
