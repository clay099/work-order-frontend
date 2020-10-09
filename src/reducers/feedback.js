import {
	LOGIN,
	LOGIN_ERROR,
	PROJECT_ERROR,
	NEW_PROJECT,
} from "../actions/types";

export default function rootReducer(state = {}, action) {
	switch (action.type) {
		case LOGIN:
			return {
				email: action.email,
			};

		case LOGIN_ERROR:
			return { error: action.error_message };

		case PROJECT_ERROR:
			return { error: action.error_message };

		case NEW_PROJECT:
			return { newProject: action.project };

		default:
			return state;
	}
}
