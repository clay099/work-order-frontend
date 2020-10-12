import { LOGOUT, USER_DETAILS, UPDATE_PROFILE } from "../actions/types";

export default function rootReducer(state = {}, action) {
	switch (action.type) {
		case USER_DETAILS:
			return {
				...state,
				details: action.details,
			};

		case UPDATE_PROFILE:
			return {
				...state,
				details: action.details,
			};

		case LOGOUT:
			return {};

		default:
			return state;
	}
}
