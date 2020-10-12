import {
	LOGIN,
	ERROR,
	NEW_PROJECT,
	UPDATE_BID,
	UPDATE_PROFILE,
} from "../actions/types";

export default function rootReducer(state = {}, action) {
	switch (action.type) {
		case LOGIN:
			return {
				email: action.email,
			};

		case ERROR:
			return { error: action.error_message };

		case ERROR:
			return { error: action.error_message };

		case NEW_PROJECT:
			return { newProject: action.project };

		case UPDATE_BID:
			return { bid: action.bidData };

		case UPDATE_PROFILE:
			return { updatedEmail: "updated" };

		default:
			return state;
	}
}
