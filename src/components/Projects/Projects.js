import React, { useEffect, useState } from "react";
import { useSelector, useDispatch, shallowEqual } from "react-redux";
import { getProjectsFromAPI } from "../../actions/projects";
import DisplayTable from "../DisplayTable/DisplayTable";

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

	if (isLoading) return <b>Loading</b>;

	if (!isLoading && projects.length === 0) {
		return <b>Please add a post!</b>;
	}

	return (
		<>
			<DisplayTable projectData={projects} />
		</>
	);
};

export default Projects;
