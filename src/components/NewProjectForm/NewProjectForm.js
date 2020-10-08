import React from "react";
import useFields from "../../hooks/useFields";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import {
	Button,
	TextField,
	Grid,
	Container,
	CssBaseline,
} from "@material-ui/core";
import FormAddressItems from "../FormAddressItems/FormAddressItems";
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
		// fix below lines
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
					<form className={classes.form} noValidate>
						<Grid container spacing={2}>
							<Grid item xs={12}>
								<TextField
									name="description"
									variant="outlined"
									required
									fullWidth
									id="description"
									label="Description"
									autoFocus
									onChange={handleChange}
									value={formData.description}
								/>
							</Grid>
							<FormAddressItems
								formData={formData}
								handleChange={handleChange}
							/>
						</Grid>
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
