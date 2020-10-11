import React, { useEffect, useState } from "react";
import { useSelector, useDispatch, shallowEqual } from "react-redux";
import { getProjectsFromAPI } from "../../actions/projects";
import DisplayTable from "../DisplayTable/DisplayTable";
import { Typography } from "@material-ui/core";
import Loading from "../Loading/Loading";

const Projects = () => {
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
				await dispatch(getProjectsFromAPI({ token }));
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
		return <Typography component="body1">Please add a post!</Typography>;
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
		</>
	);
};

export default Projects;
