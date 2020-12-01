import React from "react";
import useFields from "../../hooks/useFields";
import {
	DialogTitle,
	DialogContent,
	TextField,
	DialogActions,
	Button,
} from "@material-ui/core";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { loginUserWithAPI } from "../../actions/user";
import { loginTradesmenWithAPI } from "../../actions/tradesmen";

/** LoginForm Component
 * @param  {string} userType
 * @param  {function} handleClose
 *
 * Creates formData, handleChange and resetFormData via useFields custom hook
 *
 * Creates a handleSubmit function to submit the login details to API
 *    - If a user is returned from the API save it in Redux State and redirect to the user/tradesmen dashboard
 *    - If an error is returned from the API close Dialog and allow for the feedback SnackBar to provide the user details
 *
 *
 * Renders:
 *    - DialogTitle
 *    - DialogContent TextField input for email
 *    - DialogContent TextField input for password
 *    - Submit button
 */
const LoginForm = ({ userType, handleClose }) => {
	const INITIALSTATE = { email: "", password: "" };
	const { formData, handleChange, resetFormData } = useFields(INITIALSTATE);

	const dispatch = useDispatch();
	const history = useHistory();

	const handleSubmit = async (e) => {
		e.preventDefault();
		let resp;
		if (userType === "User") {
			resp = await dispatch(
				loginUserWithAPI({
					email: formData.email,
					password: formData.password,
				})
			);
		} else {
			resp = await dispatch(
				loginTradesmenWithAPI({
					email: formData.email,
					password: formData.password,
				})
			);
		}
		resetFormData();
		handleClose();
		if (resp.type === "LOGIN_ERROR") {
			// user could not be found. return don't redirect, snackbar should provide user feedback
			return;
		}
		history.push(`/${resp.user_type}`);
	};

	const handleTestSubmit = async (e) => {
		e.preventDefault();
		let resp;
		if (userType === "User") {
			resp = await dispatch(
				loginUserWithAPI({
					email: "user@gmail.com",
					password: "password",
				})
			);
		} else {
			resp = await dispatch(
				loginTradesmenWithAPI({
					email: "tradesmen@gmail.com",
					password: "password",
				})
			);
		}
		resetFormData();
		handleClose();
		if (resp.type === "LOGIN_ERROR") {
			// user could not be found. return don't redirect, snackbar should provide user feedback
			return;
		}
		history.push(`/${resp.user_type}`);
	};

	return (
		<div className="LoginForm">
			<DialogTitle id={`login-form-${userType}`}>
				{userType} Login Form
			</DialogTitle>
			<form>
				<DialogContent>
					<TextField
						required
						autoFocus
						id={`${userType}-email`}
						label="Email Address"
						type="email"
						name="email"
						onChange={handleChange}
						value={formData.email}
					></TextField>
					<TextField
						required
						id={`${userType}-password`}
						label="Password"
						type="password"
						name="password"
						onChange={handleChange}
						value={formData.password}
					></TextField>
				</DialogContent>
				<DialogActions>
					<Button
						type="submit"
						onClick={handleTestSubmit}
						color="secondary"
					>
						Login With Test Account
					</Button>
					<Button
						type="submit"
						onClick={handleSubmit}
						color="primary"
					>
						Login
					</Button>
				</DialogActions>
			</form>
		</div>
	);
};

export default LoginForm;
