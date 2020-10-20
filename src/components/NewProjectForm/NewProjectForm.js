import React from "react";
import useFields from "../../hooks/useFields";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { Button, Container, CssBaseline, Typography } from "@material-ui/core";
import BasicProjectForm from "../BasicProjectForm/BasicProjectForm";
import { createNewProjectWithAPI } from "../../actions/projects";
import useStyles from "./styles";

/** NewProjectForm Component
 * @param  {string} {token}
 *
 * Creates formData (object), handleChange (function) & resetFormData (function) from useFields custom hook
 *
 * Creates handleSubmit function to submit the new project data to the API
 *    - if an error occurs provide user feedback and stay on page
 *    - if no error occurs push the user to "/user"
 *
 * Renders:
 *    - Title
 *    - BasicProjectForm Component - contains all relevant fields to submit a new project to the API
 *    - "Create New Project" Button - allows user to submit the completed form
 */
const NewProjectForm = ({ token }) => {
	const classes = useStyles();
	let INITIALSTATE = {
		firstName: "",
		lastName: "",
		email: "",
		phone: "",
		password: "",
	};

	const { formData, handleChange, resetFormData } = useFields(INITIALSTATE);

	const dispatch = useDispatch();
	const history = useHistory();

	const handleSubmit = async (e) => {
		e.preventDefault();
		let resp = await dispatch(
			createNewProjectWithAPI({
				description: formData.description,
				streetAddress: formData.streetAddress,
				zip: +formData.zip,
				city: formData.city,
				country: formData.country,
				token: token,
			})
		);

		if (resp.type === "NEW_PROJECT_ERROR") {
			// could not create new project. return don't redirect, snackbar should provide user feedback
			return;
		}

		resetFormData();
		history.push(`/user`);
	};

	return (
		<div>
			<Container component="main" maxWidth="xs">
				<div className={classes.paper}>
					<CssBaseline />
					<Typography component="h1" variant="h5">
						Add New Project
					</Typography>
					<form className={classes.form} noValidate>
						<BasicProjectForm
							formData={formData}
							handleChange={handleChange}
						/>
						<Button
							type="submit"
							fullWidth
							variant="contained"
							color="primary"
							className={classes.submit}
							onClick={handleSubmit}
						>
							Create New Project
						</Button>
					</form>
				</div>
			</Container>
		</div>
	);
};

export default NewProjectForm;
