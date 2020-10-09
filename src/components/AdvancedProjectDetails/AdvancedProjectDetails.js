import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch, shallowEqual } from "react-redux";
import { Redirect } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import { getProjectDetailsFromAPI } from "../../actions/projects";
import DisplayTable from "../DisplayTable/DisplayTable";

const useStyles = makeStyles((theme) => ({
	advancedProjectDetails: {
		marginTop: theme.spacing(4),
	},
}));

const AdvancedProjectDetails = () => {
	const classes = useStyles();
	const { id } = useParams();
	// gets token from store
	const { token, project } = useSelector(
		(st) => ({
			token: st.login.token,
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
		console.log(token);
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
			<div>update project button</div>
			<div>
				update delete project button - note can only do if state is
				still auction
			</div>
			<div>reviews table</div>
			<div>add reviews button</div>
		</div>
	);
};

export default AdvancedProjectDetails;