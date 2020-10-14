import {
	GET_REVIEW,
	LOGOUT,
	UPDATE_REVIEW,
	FETCH_REVIEW,
} from "../actions/types";

export default function rootReducer(state = {}, action) {
	switch (action.type) {
		case GET_REVIEW:
			return {
				...state,
			};
		case UPDATE_REVIEW:
			return {
				...state,
				[action.review.project_id]: {
					review_comment: action.review.review_comment,
					review_rating: action.review.review_rating,
				},
			};

    // needs to be separate to update review to avoid any user feedback when getting reviews
		case FETCH_REVIEW:
			return {
				...state,
				[action.review.project_id]: {
					review_comment: action.review.review_comment,
					review_rating: action.review.review_rating,
				},
			};

		case LOGOUT:
			return {};

		default:
			return state;
	}
}
