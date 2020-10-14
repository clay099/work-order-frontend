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
import NewPostButton from "../NewPostButton/NewPostButton";

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
							Please add a post!
						</Typography>
						<NewPostButton justify="flex-start" />
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
			{userType === "user" ? <NewPostButton justify="flex-end" /> : null}
		</>
	);
};

export default Projects;
