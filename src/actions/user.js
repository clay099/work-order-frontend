import { LOGIN, ERROR, USER_DETAILS } from "./types";
import apiRequest from "../apiRequest/apiRequest";

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
			return dispatch(loginError(resp.data.error.message));
		}
		return dispatch(
			loginUser(resp.token, resp.user_type, resp.email, resp.id)
		);
	};
}

function loginUser(token, user_type, email, id) {
	return {
		type: LOGIN,
		token,
		user_type,
		email,
		id,
	};
}

function loginError(error_message) {
	return {
		type: ERROR,
		error_message,
	};
}

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
			return dispatch(loginError(resp.data.error.message));
		}
		return dispatch(signupUser(resp.token, "user", email, resp.id));
	};
}

function signupUser(token, user_type, email, id) {
	return {
		type: LOGIN,
		token,
		user_type,
		email,
		id,
	};
}

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
			return dispatch(loginError(resp.data.error.message));
		}
		console.log(resp);
		return dispatch(userDetails(resp.user));
	};
}

function userDetails(details) {
	return {
		type: USER_DETAILS,
		details,
	};
}
