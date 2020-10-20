import { TRADESMEN_DETAILS, LOGOUT } from "../actions/types";

/**tradesmen reducer
 *
 * create reducers which take an action.type and update the state
 */
export default function rootReducer(state = {}, action) {
	switch (action.type) {
		case TRADESMEN_DETAILS:
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
