import { FETCH_PROJECTS, NEW_PROJECT, NEW_PROJECT_ERROR } from "./types";
import apiRequest from "../apiRequest/apiRequest";

export function getProjectsFromAPI({ token }) {
	return async function (dispatch) {
		const resp = await apiRequest.request(
			`projects`,
			{
				_token: token,
			},
			"get"
		);
		return dispatch(getProjects(resp.projects));
	};
}

function getProjects(projects) {
	return {
		type: FETCH_PROJECTS,
		projects,
	};
}

export function createNewProjectWithAPI({
	description,
	streetAddress,
	zip,
	city,
	country,
	token,
}) {
	return async function (dispatch) {
		const resp = await apiRequest.request(
			`projects`,
			{
				description,
				street_address: streetAddress,
				address_zip: zip,
				address_city: city,
				address_country: country,
				_token: token,
			},
			"post"
		);
		// if no resp.project an error occurred
		if (!resp.project) {
			return dispatch(newProjectError(resp.data.error.message));
		}
		return dispatch(newProject(resp.project));
	};
}

function newProject(project) {
	return {
		type: NEW_PROJECT,
		project,
	};
}

function newProjectError(error_message) {
	return {
		type: NEW_PROJECT_ERROR,
		error_message,
	};
}
