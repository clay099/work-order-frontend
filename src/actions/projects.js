import {
	FETCH_PROJECTS,
	NEW_PROJECT,
	ERROR,
	PROJECT_DETAILS,
	FETCH_AUCTION_PROJECTS,
	DELETE_PROJECT,
	UPDATE_PROJECT,
	UPDATE_REVIEW,
	FETCH_REVIEW,
} from "./types";
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
			return dispatch(projectError(resp.data.error.message));
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

function projectError(error_message) {
	return {
		type: ERROR,
		error_message,
	};
}

export function getProjectDetailsFromAPI({ token, projectId }) {
	return async function (dispatch) {
		const resp = await apiRequest.request(
			`projects/${projectId}`,
			{
				_token: token,
			},
			"get"
		);
		// if no resp.project an error occurred
		if (!resp.project) {
			return dispatch(projectError(resp.data.error.message));
		}
		return dispatch(projectDetails(resp.project));
	};
}

function projectDetails(project) {
	return {
		type: PROJECT_DETAILS,
		project,
	};
}

export function getAuctionProjectsFromAPI({ token }) {
	return async function (dispatch) {
		const resp = await apiRequest.request(
			`projects/new`,
			{
				_token: token,
			},
			"get"
		);
		return dispatch(getAuctionProjects(resp.projects));
	};
}

function getAuctionProjects(projects) {
	return {
		type: FETCH_AUCTION_PROJECTS,
		projects,
	};
}

export function deleteProjectFromAPI({ token, projectId }) {
	return async function (dispatch) {
		const resp = await apiRequest.request(
			`projects/${projectId}`,
			{ _token: token },
			"delete"
		);
		// if no resp.message an error occurred
		if (!resp.message) {
			return dispatch(projectError(resp.data.error.message));
		}
		return dispatch(deleteProject(projectId));
	};
}

function deleteProject(projectId) {
	return {
		type: DELETE_PROJECT,
		projectId,
	};
}

export function markProjectAsCompleteWithAPI({ token, projectId }) {
	return async function (dispatch) {
		const resp = await apiRequest.request(
			`projects/${projectId}`,
			{ _token: token, status: "completed", completed_at: new Date() },
			"patch"
		);
		// if no resp.project an error occurred
		if (!resp.project) {
			return dispatch(projectError(resp.data.error.message));
		}
		return dispatch(updateProject(resp.project));
	};
}

function updateProject(project) {
	return {
		type: UPDATE_PROJECT,
		project,
	};
}

export function submitReviewWithAPI({
	token,
	project_id,
	review_comment,
	review_rating,
}) {
	return async function (dispatch) {
		const resp = await apiRequest.request(
			`reviews`,
			{ _token: token, project_id, review_comment, review_rating },
			"post"
		);
		// if no resp.review an error occurred
		if (!resp.review) {
			return dispatch(projectError(resp.data.error.message));
		}
		return dispatch(updateReview(resp.review));
	};
}

export function updateReviewWithAPI({
	token,
	project_id,
	review_comment,
	review_rating,
}) {
	return async function (dispatch) {
		const resp = await apiRequest.request(
			`reviews/${project_id}`,
			{ _token: token, review_comment, review_rating },
			"patch"
		);
		// if no resp.review an error occurred
		if (!resp.review) {
			return dispatch(projectError(resp.data.error.message));
		}
		return dispatch(updateReview(resp.review));
	};
}

function updateReview(review) {
	return {
		type: UPDATE_REVIEW,
		review,
	};
}

export function getProjectReviewFromAPI({ token, projectId }) {
	return async function (dispatch) {
		const resp = await apiRequest.request(
			`reviews/${projectId}`,
			{ _token: token },
			"get"
		);
		// if no resp.review an error occurred
		if (!resp.review) {
			// we don't want to provide feedback to the user
			return dispatch(noFeedbackError());
		}
		return dispatch(getReview(resp.review));
	};
}

// needs to be separate to updateReview to avoid any user feedback when getting reviews
function getReview(review) {
	return {
		type: FETCH_REVIEW,
		review,
	};
}

function noFeedbackError() {
	return {
		type: "",
	};
}
