import {
	FETCH_PROJECTS,
	LOGOUT,
	NEW_PROJECT,
	PROJECT_DETAILS,
	FETCH_AUCTION_PROJECTS,
	DELETE_PROJECT,
	UPDATE_PROJECT,
} from "../actions/types";

export default function rootReducer(state = {}, action) {
	switch (action.type) {
		case FETCH_PROJECTS:
			return { ...state, projectList: [...action.projects] };

		case LOGOUT:
			return {};

		case NEW_PROJECT:
			return {
				...state,
				projectList: [...state.projectList, action.project],
			};

		case PROJECT_DETAILS:
			return { ...state, projectDetails: action.project };

		case FETCH_AUCTION_PROJECTS:
			return { ...state, auctionProjectList: action.projects };

		case DELETE_PROJECT:
			let projects = {
				...state,
				projectList: state.projectList.filter(
					(project) => project.id !== action.projectId
				),
			};
			delete projects.projectDetails;

			return projects;

		case UPDATE_PROJECT:
			let PL = state.projectList.filter(
				(project) => project.id !== action.project.id
			);

			return {
				...state,
				projectDetails: action.project,
				projectList: [...PL, action.project],
			};

		default:
			return state;
	}
}
