import { FETCH_PROJECTS, LOGOUT, NEW_PROJECT } from "../actions/types";

export default function rootReducer(state = {}, action) {
	switch (action.type) {
		case FETCH_PROJECTS:
			return { projectList: [...action.projects] };

		case LOGOUT:
			return [];

		case NEW_PROJECT:
			return {
				...state,
				projectList: [...state.projectList, action.project],
			};

		default:
			return state;
	}
}
