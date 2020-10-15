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

/**Action Creator
 * @param  {string} token - user token
 *
 * Send request to API to get all projects from the API.
 *
 * Returns an array of project objects or error message
 *
 */
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

/** all projects action
 * @param {Array} projects - array of project objects
 *
 */
function getProjects(projects) {
	return {
		type: FETCH_PROJECTS,
		projects,
  };
  
/**Action Creator
 * @param  {string} description - project description
 * @param  {string} streetAddress - project street address
 * @param  {} zip - project zip
 * @param  {string} city - project city
 * @param  {string} country - project country
 * @param  {string} token - user token
 * 
 * Send request to API to create a new project
 * 
 * Returns an project object or error message
 */
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

/** new project action
 * @param {object} projects - project objects
 *
 */
function newProject(project) {
	return {
		type: NEW_PROJECT,
		project,
	};
}

/** project error action
 * @param {object} error_message - error message object
 *
 */
function projectError(error_message) {
	return {
		type: ERROR,
		error_message,
	};
}

/**Action Creator
 * @param  {string} token - user token
 * @param  {int} projectId - project id
 * 
 * Send request to API to get all project details from its id
 * 
 * Returns an project object or error message
 */
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

/** project details action
 * @param {object} project - project object
 *
 */
function projectDetails(project) {
	return {
		type: PROJECT_DETAILS,
		project,
	};
}

/**Action Creator
 * @param  {string} token - user token
 *
 * Send request to API to get all projects from the API currently in the auction stage.
 *
 * Returns an array of project objects or error message
 *
 */
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

/** auction project details action
 * @param {array} project - array of project object
 *
 */
function getAuctionProjects(projects) {
	return {
		type: FETCH_AUCTION_PROJECTS,
		projects,
	};
}

/**Action Creator
 * @param  {string} token - user token
 * @param  {int} projectId - project id
 *
 * Send request to API to delete the project by the provided id.
 *
 * Returns an success message string or error message
 *
 */
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

/** delete project action
 * @param {int} projectId - project id
 *
 */
function deleteProject(projectId) {
	return {
		type: DELETE_PROJECT,
		projectId,
	};
}

/**Action Creator
 * @param  {string} token - user token
 * @param  {int} projectId - project id
 *
 * Send request to API update the project and mark the status as complete at todays date.
 *
 * Returns an project object or error message
 *
 */
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

/**Action Creator
 * @param  {string} token - user token
 * @param  {int} projectId - project id
 * @param  {string} issues - issues the user had with the project
 *
 * Send request to API update the project with the provided user issue.
 *
 * Returns an project object or error message
 *
 */
export function submitIssueWithAPI({ token, projectId, issues }) {
	return async function (dispatch) {
		const resp = await apiRequest.request(
			`projects/${projectId}`,
			{ _token: token, issues },
			"patch"
		);
		// if no resp.project an error occurred
		if (!resp.project) {
			return dispatch(projectError(resp.data.error.message));
		}
		return dispatch(updateProject(resp.project));
	};
}

/** update project details action
 * @param {object} project - project object
 *
 */
function updateProject(project) {
	return {
		type: UPDATE_PROJECT,
		project,
	};
}

/**Action Creator
 * @param  {string} token - user token
 * @param  {int} project_id - project id
 * @param  {string} review_comment - review comment the user had for the project
 * @param  {int} review_rating - review rating the user provided between 0-10
 *
 * Send request to API create a review based on the project id
 *
 * Returns an review object or error message
 *
 */
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


/**Action Creator
 * @param  {string} token - user token
 * @param  {int} project_id - project id
 * @param  {string} review_comment - review comment the user had for the project
 * @param  {int} review_rating - review rating the user provided between 0-10
 *
 * Send request to API update a review based on the project id
 *
 * Returns an review object or error message
 *
 */
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

/** update review action
 * @param {object} review - review object
 *
 */
function updateReview(review) {
	return {
		type: UPDATE_REVIEW,
		review,
	};
}


/**Action Creator
 * @param  {string} token - user token
 * @param  {int} projectID - project id
 *
 * Send request to API to get review based on the project id
 *
 * Returns an review object or error message
 *
 */
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

/** get review action
 * @param {object} review - review object
 *
 * needs to be separate to updateReview to avoid any user feedback when getting reviews
 */
function getReview(review) {
	return {
		type: FETCH_REVIEW,
		review,
	};
}

/** update review action
 *
 * needs to be separate to error to avoid any user feedback when getting reviews and an error is thrown (occurs if no review is provided for project id)
 */
function noFeedbackError() {
	return {
		type: "",
	};
}
