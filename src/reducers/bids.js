import { UPDATE_BID, LOGOUT, FETCH_ALL_BIDS } from "../actions/types";

/**bids reducer
 *
 * create reducers which take an action.type and update the state
 */
export default function rootReducer(state = {}, action) {
	switch (action.type) {
		case UPDATE_BID:
			return {
				// spread state
				...state,
				// only change data which relates the the project
				[action.bidData.project_id]: {
					// spread data for the project
					...state[action.bidData.project_id],
					// update or create key of tradesmen_id & value of tradesmen bid
					[action.bidData.tradesmen_id]: action.bidData.bid,
				},
			};

		case FETCH_ALL_BIDS:
			// get current state
			let bids = { ...state };
			// for each value in bidData array
			action.bidData.forEach((bid) => {
				// only change date for this project
				bids[bid.project_id] = {
					// spread the current project bids if state holds any
					...bids[bid.project_id],
					//add new bid data
					[bid.tradesmen_id]: {
						bid: bid.bid,
						first_name: bid.first_name,
						last_name: bid.last_name,
					},
				};
			});
			return bids;

		case LOGOUT:
			return {};

		default:
			return state;
	}
}
