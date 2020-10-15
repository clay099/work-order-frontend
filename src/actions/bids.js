import { UPDATE_BID, ERROR, FETCH_ALL_BIDS, UPDATE_PROJECT } from "./types";
import apiRequest from "../apiRequest/apiRequest";

/**Action Creator
 * @param  {string} token - user token
 * @param  {int} projectId - project id
 * @param  {number} bid - tradesmen bid for project
 *
 * Send request to API to make a bid on a project.
 *
 * Returns a bid object or error message
 *
 */
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

/**Action Creator
 * @param  {string} token - user token
 * @param  {int} projectId - project id
 * @param  {number} bid - tradesmen bid for project
 *
 * Send request to API to update a tradesmen bid on a project
 *
 * Returns a bid object or error message
 *
 */

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

/** update bid action
 * @param {object} bidData - Bid Object
 *
 */
function updateBid(bidData) {
	return {
		type: UPDATE_BID,
		bidData,
	};
}

/** bid error action
 * @param {object} error_message - error object
 *
 */
function bidError(error_message) {
	return {
		type: ERROR,
		error_message,
	};
}

/**Action Creator
 * @param  {string} token - user token
 *
 * Send request to API to get all bids.
 *
 * Returns array full of bid objects or an error message
 */
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

/** all bid action
 * @param {object} bidData - array of bid objects
 *
 */
function allBids(bidData) {
	return {
		type: FETCH_ALL_BIDS,
		bidData,
	};
}

/**Action Creator
 * @param  {int} projectId - project id
 * @param  {string} token - user token
 * @param  {int} tradesmen_id - tradesmen id
 * @param  {number} price - accepted bid price for project
 *
 * Send request to API to updated the project with successful tradesmen and bid price (links the tradesmen to the project).
 *
 * Returns an project object or error message
 *
 */
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

/** update project action
 * @param {object} project - project object
 *
 */
function acceptBid(project) {
	return {
		type: UPDATE_PROJECT,
		project,
	};
}
