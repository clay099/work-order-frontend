import React from "react";
import { Button, TextField, Grid } from "@material-ui/core";
import FormAddressItems from "../FormAddressItems/FormAddressItems";
import useStyles from "./styles";

/** UserDetailsForm Component
 * @param  {string} userType
 * @param  {function} handleSubmit
 * @param  {object} formData
 * @param  {function} handleChange
 * @param  {boolean} disabled default false
 * @param  {function} disabledEmail default false
 * @param  {string} buttonText
 * @param  {JSX Component} editButton = null
 *
 * Renders form with the following TextFields:
 *    - First Name
 *    - Last Name
 *    - Email
 *    - Phone
 *    - if usertype === "user":
 *        - FormAddressItems Component
 *    - Password
 *    - if disabledEmail is true: - disabledEmail is only true if user is editing/updating their profile
 *        - New Password
 *        - Confirm New Password
 *
 * Renders buttons:
 *    - Submit - submits form
 *    - Edit Button - changes disabled to be false - only renders if edit button is not null AND "disabled" is true
 */
export default function UserDetailsForm({
	userType,
	handleSubmit,
	formData,
	handleChange,
	disabled = false,
	disabledEmail = false,
	buttonText,
	editButton = null,
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
							disabled={disabled}
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
							disabled={disabled}
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
							disabled={disabledEmail}
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
							disabled={disabled}
						/>
					</Grid>
					{userType === "user" ? (
						<FormAddressItems
							formData={formData}
							handleChange={handleChange}
							disabled={disabled}
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
							disabled={disabled}
						/>
					</Grid>
					{disabledEmail ? (
						<>
							<Grid item xs={12} sm={6}>
								<TextField
									variant="outlined"
									name="newPassword"
									label="New Password"
									type="password"
									id="newPassword"
									onChange={handleChange}
									value={formData.newPassword}
									disabled={disabled}
									helperText="leave blank if you don't wish to change your password"
								/>
							</Grid>
							<Grid item xs={12} sm={6}>
								<TextField
									variant="outlined"
									name="confirmNewPassword"
									label="Confirm New Password"
									type="password"
									id="confirmNewPassword"
									onChange={handleChange}
									value={formData.confirmNewPassword}
									disabled={disabled}
									helperText="leave blank if you don't wish to change your password"
								/>
							</Grid>
						</>
					) : null}
				</Grid>
				{!disabled ? (
					<Button
						type="submit"
						fullWidth
						variant="contained"
						color="primary"
						className={classes.submit}
						onClick={handleSubmit}
					>
						{buttonText}
					</Button>
				) : null}
			</form>
			{/* needs to be outside from to prevent from submitting on click */}
			{disabled ? editButton : null}
		</div>
	);
}
