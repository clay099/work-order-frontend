import React from "react";
import { Button, TextField, Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import useFields from "../../hooks/useFields";
import { signupUserWithAPI } from "../../actions/user";
import { signupTradesmenWithAPI } from "../../actions/tradesmen";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import FormAddressItems from "../FormAddressItems/FormAddressItems";

const useStyles = makeStyles((theme) => ({
	form: {
		width: "100%", // Fix IE 11 issue.
		marginTop: theme.spacing(3),
	},
	submit: {
		margin: theme.spacing(3, 0, 2),
	},
}));

export default function SignUp({ userType }) {
	const classes = useStyles();
	let INITIALSTATE = {
		firstName: "",
		lastName: "",
		email: "",
		phone: "",
		password: "",
	};
	if (userType === "user") {
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
		if (userType === "user") {
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
		history.push(`/${resp.user_type}`);
	};

	return (
		<div>
			<form className={classes.form} noValidate>
				<Grid container spacing={2}>
					<Grid item xs={12} sm={6}>
						<TextField
							name="firstName"
							variant="outlined"
							required
							fullWidth
							id="firstName"
							label="First Name"
							autoFocus
							onChange={handleChange}
							value={formData.firstName}
						/>
					</Grid>
					<Grid item xs={12} sm={6}>
						<TextField
							variant="outlined"
							required
							fullWidth
							id="lastName"
							label="Last Name"
							name="lastName"
							onChange={handleChange}
							value={formData.lastName}
						/>
					</Grid>
					<Grid item xs={12} sm={6}>
						<TextField
							variant="outlined"
							required
							fullWidth
							id="email"
							label="Email Address"
							name="email"
							onChange={handleChange}
							value={formData.email}
						/>
					</Grid>
					<Grid item xs={12} sm={6}>
						<TextField
							variant="outlined"
							required
							fullWidth
							id="phone"
							label="Phone Number"
							name="phone"
							onChange={handleChange}
							value={formData.phone}
						/>
					</Grid>
					{userType === "user" ? (
						<FormAddressItems
							formData={formData}
							handleChange={handleChange}
						/>
					) : null}
					<Grid item xs={12}>
						<TextField
							variant="outlined"
							required
							fullWidth
							name="password"
							label="Password"
							type="password"
							id="password"
							onChange={handleChange}
							value={formData.password}
						/>
					</Grid>
				</Grid>
				<Button
					type="submit"
					fullWidth
					variant="contained"
					color="primary"
					className={classes.submit}
					onClick={handleSubmit}
				>
					Sign Up New {userType}
				</Button>
			</form>
		</div>
	);
}
