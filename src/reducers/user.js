import { LOGOUT, USER_DETAILS } from "../actions/types";

export default function rootReducer(state = {}, action) {
	switch (action.type) {
		case USER_DETAILS:
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
