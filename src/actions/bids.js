import { UPDATE_BID, ERROR, FETCH_ALL_BIDS, UPDATE_PROJECT } from "./types";
import apiRequest from "../apiRequest/apiRequest";

export function submitNewBidToAPI({ token, projectId, bid }) {
	return async function (dispatch) {
		const resp = await apiRequest.request(
			"bid",
			{
				_token: token,
				bid,
				project_id: projectId,
			},
			"post"
		);
		// if no resp.bid an error occurred
		if (!resp.bid) {
			return dispatch(bidError(resp.data.error.message));
		}
		return dispatch(updateBid(resp.bid));
	};
}

export function updateBidWithAPI({ token, projectId, bid }) {
	return async function (dispatch) {
		const resp = await apiRequest.request(
			`bid/${projectId}`,
			{
				_token: token,
				bid,
			},
			"patch"
		);
		// if no resp.bid an error occurred
		if (!resp.bid) {
			return dispatch(bidError(resp.data.error.message));
		}
		return dispatch(updateBid(resp.bid));
	};
}

function updateBid(bidData) {
	return {
		type: UPDATE_BID,
		bidData,
	};
}

function bidError(error_message) {
	return {
		type: ERROR,
		error_message,
	};
}

export function getBidsFromAPI({ token }) {
	return async function (dispatch) {
		const resp = await apiRequest.request(
			`bid`,
			{
				_token: token,
			},
			"get"
		);
		// if no resp.bid an error occurred
		if (!resp.bids) {
			return dispatch(bidError(resp.data.error.message));
		}
		return dispatch(allBids(resp.bids));
	};
}

function allBids(bidData) {
	return {
		type: FETCH_ALL_BIDS,
		bidData,
	};
}

export function acceptBidWithAPI({ projectId, token, tradesmen_id, price }) {
	return async function (dispatch) {
		const resp = await apiRequest.request(
			`projects/${projectId}`,
			{
				_token: token,
				tradesmen_id,
				status: "progressing",
				price,
			},
			"patch"
		);
		// if no resp.project an error occurred
		if (!resp.project) {
			return dispatch(bidError(resp.data.error.message));
		}
		return dispatch(acceptBid(resp.project));
	};
}

function acceptBid(project) {
	return {
		type: UPDATE_PROJECT,
		project,
	};
}
