import { LOGIN, ERROR, USER_DETAILS, UPDATE_PROFILE } from "./types";
import apiRequest from "../apiRequest/apiRequest";

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

function loginTradesmen(token, user_type, email, id) {
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
			signupTradesmen(resp.token, "tradesmen", email, resp.id)
		);
	};
}

function signupTradesmen(token, user_type, email, id) {
	return {
		type: LOGIN,
		token,
		user_type,
		email,
		id,
	};
}

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

function tradesmenDetails(details) {
	return {
		type: USER_DETAILS,
		details,
	};
}

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

function updateTradesmen(details, token, user_type) {
	return {
		type: UPDATE_PROFILE,
		details,
		token,
		user_type,
	};
}

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

// just return passed it won't provide any reducer function
function checkPassword() {
	return {
		type: "PASSED",
	};
}
