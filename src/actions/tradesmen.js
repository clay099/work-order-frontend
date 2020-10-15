import { LOGIN, ERROR, USER_DETAILS, UPDATE_PROFILE } from "./types";
import apiRequest from "../apiRequest/apiRequest";

/**Action Creator
 * @param  {string} email - user email
 * @param  {string} password - user password
 *
 * Send request to API to verify the user and login.
 *
 * Returns an token, user_type, email and id or error message
 *
 */
export function loginTradesmenWithAPI({ email, password }) {
	return async function (dispatch) {
		const resp = await apiRequest.request(
			`login/tradesmen`,
			{
				email,
				password,
			},
			"post"
		);
		// tradesmen not found in DB
		if (resp.status === 404) {
			return dispatch(error(resp.data.error.message));
		}
		return dispatch(
			loginTradesmen(resp.token, resp.user_type, resp.email, resp.id)
		);
	};
}

/** login action
 * @param {Array} projects
 * @param {string} token
 * @param {string} user_type
 * @param {string} email
 * @param {int} id
 */
function loginTradesmen(token, user_type, email, id) {
	return {
		type: LOGIN,
		token,
		user_type,
		email,
		id,
	};
}

/** error action
 * @param {object} error_message
 *
 */
function error(error_message) {
	return {
		type: ERROR,
		error_message,
	};
}

/**Action Creator
 * @param  {string} firstName
 * @param  {string} lastName
 * @param  {string} email
 * @param  {number} phone
 * @param  {string} password
 *
 * Send request to API to create a new tradesmen.
 *
 * Returns an token, user_type, email and id or error message
 *
 */
export function signupTradesmenWithAPI({
	firstName,
	lastName,
	email,
	phone,
	password,
}) {
	return async function (dispatch) {
		const resp = await apiRequest.request(
			`tradesmen`,
			{
				first_name: firstName,
				last_name: lastName,
				email,
				phone,
				password,
			},
			"post"
		);
		// tradesmen not created
		if (!resp.token) {
			return dispatch(error(resp.data.error.message));
		}
		return dispatch(
			loginTradesmen(resp.token, "tradesmen", email, resp.id)
		);
	};
}

/**Action Creator
 * @param  {string} token
 * @param  {int} id
 *
 * Send request to API to get tradesmen based on id.
 *
 * Returns an tradesmen object or error message
 *
 */
export function getTradesmenProfileFromAPI({ token, id }) {
	return async function (dispatch) {
		const resp = await apiRequest.request(
			`tradesmen/${id}`,
			{
				_token: token,
			},
			"get"
		);
		// user not found in DB
		if (!resp.tradesman) {
			return dispatch(error(resp.data.error.message));
		}
		return dispatch(tradesmenDetails(resp.tradesman));
	};
}

/** tradesmen details action
 * @param {object} details - tradesmen details
 *
 */
function tradesmenDetails(details) {
	return {
		type: USER_DETAILS,
		details,
	};
}

/**Action Creator
 * @param  {string} firstName
 * @param  {string} lastName
 * @param  {string} email
 * @param  {number} phone
 * @param  {string} password
 * @param  {int} id
 * @param  {string} token
 *
 * Send request to API to update a tradesmen based on their id & token.
 *
 * Returns an tradesmen object, token and user_type or error message
 *
 */
export function updateTradesmenWithAPI({
	firstName,
	lastName,
	email,
	phone,
	password,
	id,
	token,
}) {
	return async function (dispatch) {
		const resp = await apiRequest.request(
			`tradesmen/${id}`,
			{
				first_name: firstName,
				last_name: lastName,
				email,
				phone,
				password,
				_token: token,
			},
			"patch"
		);
		// user update not successful
		if (!resp.token) {
			return dispatch(error(resp.data.error.message));
		}

		return dispatch(
			updateTradesmen(resp.tradesman, resp.token, "tradesmen")
		);
	};
}

/** update tradesmen action
 * @param {object} details - tradesmen details
 * @param {string} token
 * @param {string} user_type
 *
 */
function updateTradesmen(details, token, user_type) {
	return {
		type: UPDATE_PROFILE,
		details,
		token,
		user_type,
	};
}

/**Action Creator
 * @param  {string} email
 * @param  {string} password
 *
 * Send request to API to login tradesmen
 *
 * Returns passed or error message
 *
 */
export function checkTradesmenPasswordWithAPI({ email, password }) {
	return async function (dispatch) {
		const resp = await apiRequest.request(
			`login/tradesmen`,
			{
				email,
				password,
			},
			"post"
		);
		// tradesmen not found in DB
		if (resp.data) {
			return dispatch(error(resp.data.error.message));
		}
		return dispatch(checkPassword());
	};
}

/** passed login action
 *
 * used to check that password is correct before changing user profile
 *
 * just return passed it won't provide any reducer function as program will then try to update the user profile. Any user feedback to come from this action
 *
 */
function checkPassword() {
	return {
		type: "PASSED",
	};
}
