import { LOGIN, ERROR, USER_DETAILS, UPDATE_PROFILE } from "./types";
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
			return dispatch(error(resp.data.error.message));
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

function error(error_message) {
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
			return dispatch(error(resp.data.error.message));
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
			return dispatch(error(resp.data.error.message));
		}
		return dispatch(userDetails(resp.user));
	};
}

function userDetails(details) {
	return {
		type: USER_DETAILS,
		details,
	};
}

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

function updateUser(details, token, user_type) {
	return {
		type: UPDATE_PROFILE,
		details,
		token,
		user_type,
	};
}

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
		// tradesmen not found in DB
		if (resp.data) {
			return dispatch(error(resp.data.error.message));
		}
		return dispatch(checkPassword());
	};
}

// just return passed it won't provide any reducer function
function checkPassword() {
	return {
		type: "PASSED",
	};
}
