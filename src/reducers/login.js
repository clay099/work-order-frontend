import { LOGIN, LOGOUT, UPDATE_PROFILE } from "../actions/types";

/**login reducer
 *
 * create reducers which take an action.type and update the state
 */
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

		// separate from LOGIN to provide different user feedback in the feedback reducer
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
