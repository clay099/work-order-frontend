import React, { useEffect, useState } from "react";
import { useSelector, useDispatch, shallowEqual } from "react-redux";
import {
	getProjectsFromAPI,
	getProjectReviewFromAPI,
} from "../../actions/projects";
import { getBidsFromAPI } from "../../actions/bids";
import DisplayTable from "../DisplayTable/DisplayTable";
import { Typography } from "@material-ui/core";
import Loading from "../Loading/Loading";
import NewProjectButton from "../NewProjectButton/NewProjectButton";

/** Projects Component
 * @param  {string} {userType}
 *
 * Gets Projects and Token from Redux State
 *
 * Sends a request to the API to get the latest project list and bids
 *
 * When the Project list is returned also sends a request to the API to get the review for each project
 *
 *
 * Displays a loading page while API request occurs
 *
 * When loading has finished & user is logged in but no projects are associated with the user returns:
 *    - feedback for user to add project
 *
 * When loading has finished displays:
 *    - DisplayTable Component - containing all projects associated with the user
 *    - If user is logged in displays NewProjectButton Component so user can add a new project
 */
const Projects = ({ userType }) => {
	const { projects, token } = useSelector(
		(st) => ({
			projects: st.projects.projectList,
			token: st.login.token,
		}),
		shallowEqual
	);
	const dispatch = useDispatch();
	const [isLoading, setIsLoading] = useState(true);

	useEffect(
		function () {
			async function getProjects() {
				let resp;
				Promise.all([
					(resp = await dispatch(getProjectsFromAPI({ token }))),
					await dispatch(getBidsFromAPI({ token })),
				]);

				Promise.all(
					resp.projects.map((project) => {
						dispatch(
							getProjectReviewFromAPI({
								token,
								projectId: project.id,
							})
						);
					})
				);

				setIsLoading(false);
			}

			if (isLoading) {
				getProjects();
			}
		},
		[dispatch, isLoading, token]
	);

	if (isLoading) return <Loading />;

	if (!isLoading && projects.length === 0) {
		return (
			<>
				{userType === "user" ? (
					<>
						<Typography component="body1">
							Please add a project!
						</Typography>
						<NewProjectButton justify="flex-start" />
					</>
				) : null}
			</>
		);
	}

	const currentAndCompletedHeadingList = [
		"Description",
		"Street Address",
		"City",
		"Date Created",
		"Status",
		"Price",
		"Completed Date",
		"Issues",
	];
	return (
		<>
			<DisplayTable
				projectData={projects}
				headingList={currentAndCompletedHeadingList}
				tableTitle="Current & Completed Projects"
			/>
			{userType === "user" ? (
				<NewProjectButton justify="flex-end" />
			) : null}
		</>
	);
};

export default Projects;
