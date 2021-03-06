import React from "react";
import UserDetailsForm from "../UserDetailsForm/UserDetailsForm";
import {
	CssBaseline,
	Container,
	Typography,
	Avatar,
	Button,
	Grid,
} from "@material-ui/core";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import useToggle from "../../hooks/useToggle";
import useFields from "../../hooks/useFields";
import { signupUserWithAPI } from "../../actions/user";
import { signupTradesmenWithAPI } from "../../actions/tradesmen";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import useStyles from "./styles";

/** Register Component
 *
 * Creates a hideUser & showUser function which allows for buttons to be clicked and the form to be changed from create user to create tradesmen.
 *
 * Creates handleSubmit function for users to submit their completed form to create a new user or tradesmen and submit to the API. If successful will provide user feedback and redirect to "/users" or "/tradesmen". If unsuccessful will reset form and provide user feedback.
 *
 * Renders:
 *    - Title & Icon
 *    - Two buttons - to change between user and tradesmen
 *    - UserDetailsFrom - contains all relevant form details for users to complete and submit to the API
 *
 */
const Register = () => {
	const classes = useStyles();

	const { setTrue: showUser, setFalse: hideUser, toggle } = useToggle(true);

	let userVariant;
	let tradesmenVariant;

	if (toggle) {
		userVariant = "contained";
		tradesmenVariant = "outlined";
	} else {
		userVariant = "outlined";
		tradesmenVariant = "contained";
	}

	let INITIALSTATE = {
		firstName: "",
		lastName: "",
		email: "",
		phone: "",
		password: "",
	};
	if (toggle) {
		INITIALSTATE.streetAddress = "";
		INITIALSTATE.zip = "";
		INITIALSTATE.city = "";
		INITIALSTATE.country = "";
	}

	const { formData, handleChange, resetFormData } = useFields(INITIALSTATE);

	const dispatch = useDispatch();
	const history = useHistory();

	const handleSubmit = async (e) => {
		e.preventDefault();
		let resp;
		if (toggle) {
			resp = await dispatch(
				signupUserWithAPI({
					firstName: formData.firstName,
					lastName: formData.lastName,
					email: formData.email,
					password: formData.password,
					phone: +formData.phone,
					streetAddress: formData.streetAddress,
					zip: +formData.zip,
					city: formData.city,
					country: formData.country,
				})
			);
		} else {
			resp = await dispatch(
				signupTradesmenWithAPI({
					firstName: formData.firstName,
					lastName: formData.lastName,
					email: formData.email,
					password: formData.password,
					phone: +formData.phone,
				})
			);
		}
		if (resp.type === "LOGIN_ERROR") {
			// could not create new user/tradesmen. return don't redirect, snackbar should provide user feedback
			return;
		}

		resetFormData();
		if (toggle) {
			history.push(`/user`);
		} else {
			history.push(`/tradesmen`);
		}
	};

	let userType = toggle ? "user" : "tradesmen";

	return (
		<Container component="main" maxWidth="xs">
			<div className={classes.paper}>
				<CssBaseline />
				<Avatar className={classes.avatar}>
					<LockOutlinedIcon />
				</Avatar>
				<Typography component="h1" variant="h5">
					Sign up
				</Typography>
				<Grid spacing={2} container className={classes.userType}>
					<Grid item xs={12} sm={6}>
						<Button
							fullWidth
							variant={userVariant}
							color="primary"
							onClick={showUser}
						>
							New User
						</Button>
					</Grid>
					<Grid item xs={12} sm={6}>
						<Button
							fullWidth
							variant={tradesmenVariant}
							color="primary"
							onClick={hideUser}
						>
							New Tradesmen
						</Button>
					</Grid>
				</Grid>
				<UserDetailsForm
					handleSubmit={handleSubmit}
					formData={formData}
					handleChange={handleChange}
					userType={userType}
					buttonText={`Sign Up New ${userType}`}
				/>
			</div>
		</Container>
	);
};

export default Register;
