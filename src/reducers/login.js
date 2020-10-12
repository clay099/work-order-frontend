import { LOGIN, LOGOUT, UPDATE_PROFILE } from "../actions/types";

export default function rootReducer(state = {}, action) {
	switch (action.type) {
		case LOGIN:
			return {
				...state,
				token: action.token,
				user_type: action.user_type,
				email: action.email,
				id: action.id,
			};

		case UPDATE_PROFILE:
			return {
				...state,
				token: action.token,
				user_type: action.user_type,
				email: action.details.email,
				id: action.details.id,
			};

		case LOGOUT:
			return {};

		default:
			return state;
	}
}
