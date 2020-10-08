import { LOGIN, LOGOUT, LOGIN_ERROR } from "./types";
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
			return dispatch(loginError(resp.data.error.message));
		}
		return dispatch(loginTradesmen(resp.token, resp.user_type, resp.email));
	};
}

function loginTradesmen(token, user_type, email) {
	return {
		type: LOGIN,
		token,
		user_type,
		email,
	};
}

function loginError(error_message) {
	return {
		type: LOGIN_ERROR,
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
			return dispatch(loginError(resp.data.error.message));
		}
		return dispatch(signupTradesmen(resp.token, "user", email));
	};
}

function signupTradesmen(token, user_type, email) {
	return {
		type: LOGIN,
		token,
		user_type,
		email,
	};
}
