import { LOGOUT, USER_DETAILS, UPDATE_PROFILE } from "../actions/types";

/**user reducer
 *
 * create reducers which take an action.type and update the state
 */
export default function rootReducer(state = {}, action) {
	switch (action.type) {
		case USER_DETAILS:
			return {
				...state,
				details: action.details,
			};

		// separate from USER_DETAILS to provide user feedback (UPDATE_PROFILE is called in feedback reducer)
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
