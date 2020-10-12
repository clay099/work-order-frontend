import React from "react";
import { Button, TextField, Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
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

export default function UserDetailsForm({
	userType,
	handleSubmit,
	formData,
	handleChange,
}) {
	const classes = useStyles();

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
