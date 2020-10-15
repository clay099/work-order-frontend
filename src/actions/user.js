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
export function loginUserWithAPI({ email, password }) {
	return async function (dispatch) {
		const resp = await apiRequest.request(
			`login/user`,
			{
				email,
				password,
			},
			"post"
		);
		// user not found in DB
		if (resp.status === 404) {
			return dispatch(error(resp.data.error.message));
		}
		return dispatch(
			loginUser(resp.token, resp.user_type, resp.email, resp.id)
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
function loginUser(token, user_type, email, id) {
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
 * @param  {string} streetAddress
 * @param  {int} zip
 * @param  {string} city
 * @param  {string} country
 *
 * Send request to API to create a new user.
 *
 * Returns an token, user_type, email and id or error message
 *
 */
export function signupUserWithAPI({
	firstName,
	lastName,
	email,
	phone,
	password,
	streetAddress,
	zip,
	city,
	country,
}) {
	return async function (dispatch) {
		const resp = await apiRequest.request(
			`users`,
			{
				first_name: firstName,
				last_name: lastName,
				email,
				phone,
				password,
				street_address: streetAddress,
				address_zip: zip,
				address_city: city,
				address_country: country,
			},
			"post"
		);
		// user not created
		if (!resp.token) {
			return dispatch(error(resp.data.error.message));
		}
		return dispatch(loginUser(resp.token, "user", email, resp.id));
	};
}

/**Action Creator
 * @param  {string} token
 * @param  {int} id
 *
 * Send request to API to get user based on id.
 *
 * Returns an user object or error message
 *
 */
export function getUserProfileFromAPI({ token, id }) {
	return async function (dispatch) {
		const resp = await apiRequest.request(
			`users/${id}`,
			{
				_token: token,
			},
			"get"
		);
		// user not found in DB
		if (!resp.user) {
			return dispatch(error(resp.data.error.message));
		}
		return dispatch(userDetails(resp.user));
	};
}

/** user details action
 * @param {object} details - user details
 *
 */
function userDetails(details) {
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
 * @param  {string} streetAddress
 * @param  {int} zip
 * @param  {string} city
 * @param  {string} country
 * @param  {int} id
 * @param  {string} token
 *
 * Send request to API to update a user based on their id & token.
 *
 * Returns an user object, token and user_type or error message
 *
 */
export function updateUserWithAPI({
	firstName,
	lastName,
	email,
	phone,
	password,
	streetAddress,
	zip,
	city,
	country,
	id,
	token,
}) {
	return async function (dispatch) {
		const resp = await apiRequest.request(
			`users/${id}`,
			{
				first_name: firstName,
				last_name: lastName,
				email,
				phone,
				password,
				street_address: streetAddress,
				address_zip: zip,
				address_city: city,
				address_country: country,
				_token: token,
			},
			"patch"
		);
		// user update not successful
		if (!resp.token) {
			return dispatch(error(resp.data.error.message));
		}
		return dispatch(updateUser(resp.user, resp.token, "user"));
	};
}

/** update user action
 * @param {object} details - user details
 * @param {string} token
 * @param {string} user_type
 *
 */
function updateUser(details, token, user_type) {
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
 * Send request to API to login user
 *
 * Returns passed or error message
 *
 */
export function checkUserPasswordWithAPI({ email, password }) {
	return async function (dispatch) {
		const resp = await apiRequest.request(
			`login/user`,
			{
				email,
				password,
			},
			"post"
		);
		// user not found in DB
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
 */ function checkPassword() {
	return {
		type: "PASSED",
	};
}
