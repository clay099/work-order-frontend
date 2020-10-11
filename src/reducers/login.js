import { LOGIN, LOGOUT } from "../actions/types";

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

		case LOGOUT:
			return {};

		default:
			return state;
	}
}
