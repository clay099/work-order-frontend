import React from "react";
import useFields from "../../hooks/useFields";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import { Button, Container, CssBaseline, Typography } from "@material-ui/core";
import BasicProjectForm from "../BasicProjectForm/BasicProjectForm";
import { createNewProjectWithAPI } from "../../actions/projects";

const useStyles = makeStyles((theme) => ({
	paper: {
		marginTop: theme.spacing(2),
		display: "flex",
		flexDirection: "column",
		alignItems: "center",
	},
	form: {
		width: "100%", // Fix IE 11 issue.
		marginTop: theme.spacing(3),
	},
	submit: {
		margin: theme.spacing(3, 0, 2),
	},
}));

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
