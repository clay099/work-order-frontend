import { UPDATE_BID, LOGOUT, FETCH_ALL_BIDS } from "../actions/types";

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
					// update/create key of tradesmen_id & value of tradesmen bid
					[action.bidData.tradesmen_id]: action.bidData.bid,
				},
			};

		case FETCH_ALL_BIDS:
			let bids = { ...state };
			action.bidData.forEach((bid) => {
				bids[bid.project_id] = {
					...bids[bid.project_id],
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
