import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch, shallowEqual } from "react-redux";
import { Redirect } from "react-router-dom";
import { getProjectDetailsFromAPI } from "../../actions/projects";
import DisplayTable from "../DisplayTable/DisplayTable";
import UserProjectButtons from "../UserProjectButtons/UserProjectButtons";
import BidTable from "../BidTable/BidTable";
import ReviewTable from "../ReviewTable/ReviewTable";
import useStyles from "./styles";

const AdvancedProjectDetails = () => {
	const classes = useStyles();
	const { id } = useParams();
	// gets token from store
	const { token, userType, project } = useSelector(
		(st) => ({
			token: st.login.token,
			userType: st.login.user_type,
			project: st.projects.projectDetails,
		}),
		shallowEqual
	);

	const dispatch = useDispatch();
	const [isLoading, setIsLoading] = useState(true);

	useEffect(
		function () {
			async function getProjects() {
				await dispatch(
					getProjectDetailsFromAPI({ token, projectId: id })
				);
				setIsLoading(false);
			}

			if (isLoading) {
				getProjects();
			}
		},
		[dispatch, isLoading, token]
	);

	// if user is not logged in token will evaluate to false and you will be redirected to the home page.
	if (!token) {
		return <Redirect to="/" />;
	}

	if (isLoading) return <b>Loading</b>;

	const headingList = [
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
		<div className={classes.advancedProjectDetails}>
			<DisplayTable
				projectData={[project]}
				headingList={headingList}
				tableTitle="Project Details"
			/>

			{project.status === "completed" ? (
				<ReviewTable projectId={project.id} />
			) : null}

			{userType === "user" ? (
				<>
					{project.status === "auction" ? (
						<BidTable projectId={project.id} />
					) : null}

					<UserProjectButtons
						status={project.status}
						id={project.id}
						token={token}
					/>
				</>
			) : null}
		</div>
	);
};

export default AdvancedProjectDetails;
