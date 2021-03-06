import React, { useEffect, useState } from "react";
import { useSelector, useDispatch, shallowEqual } from "react-redux";
import { Redirect } from "react-router-dom";
import { Typography, Button, Container } from "@material-ui/core";
import { getUserProfileFromAPI } from "../../actions/user";
import { getTradesmenProfileFromAPI } from "../../actions/tradesmen";
import Loading from "../Loading/Loading";
import useFields from "../../hooks/useFields";
import useToggle from "../../hooks/useToggle";
import UserDetailsForm from "../UserDetailsForm/UserDetailsForm";
import { updateUserWithAPI } from "../../actions/user";
import { updateTradesmenWithAPI } from "../../actions/tradesmen";
import useCheckPassword from "../../hooks/useCheckPassword";
import useStyles from "./styles";

/** UserProfile Component
 *
 * Gets token, userType, id, userDetails from Redux State
 *
 * Sends a request to the API to get the user details
 *
 * Creates formData, handleChange from useFields customHook and initializes it with the user data returned from the API
 *
 * Creates handleSubmit function which checks:
 *    1. users current password matches the API
 *        - if true continue
 *        - if false stop action & provide feedback
 *
 *    2. if form has a newPassword field completed check that the newPassword and confirmNewPassword fields match
 *        - if true make password field to be provided to API equal newPassword
 *        - if false leave password field to be provided to API equal currentPassword
 *
 *    3. Submit form data to API for tradesmen or user API route. (note: redux reducers will provide success or failure feedback via Feedback Component)
 *
 *    4. Disable form
 *
 * Renders:
 *    - if user is not logged in redirects to homepage
 *    - Page Heading
 *    - UserDetailsForm Component
 */
const UserProfile = () => {
	const { token, userType, id, userDetails } = useSelector(
		(st) => ({
			token: st.login.token,
			userType: st.login.user_type,
			id: st.login.id,
			userDetails: st.user.details,
		}),
		shallowEqual
	);

	const {
		toggle: disabled,
		setTrue: disabledTrue,
		setFalse: disabledFalse,
	} = useToggle(true);

	const dispatch = useDispatch();
	const [isLoading, setIsLoading] = useState(true);

	let INITIALSTATE = {
		firstName: "",
		lastName: "",
		email: "",
		phone: "",
		password: "",
		newPassword: "",
		confirmNewPassword: "",
	};
	if (userType === "user") {
		INITIALSTATE.streetAddress = "";
		INITIALSTATE.zip = "";
		INITIALSTATE.city = "";
		INITIALSTATE.country = "";
	}

	const { formData, handleChange } = useFields(INITIALSTATE);

	useEffect(
		function () {
			async function getProfile() {
				let resp;
				if (userType === "user") {
					resp = await dispatch(getUserProfileFromAPI({ token, id }));
				} else {
					resp = await dispatch(
						getTradesmenProfileFromAPI({ token, id })
					);
				}

				formData.firstName = resp.details.first_name || "";
				formData.lastName = resp.details.last_name || "";
				formData.email = resp.details.email || "";
				formData.phone = resp.details.phone || "";
				if (userType === "user") {
					formData.streetAddress = resp.details.street_address || "";
					formData.zip = resp.details.address_zip || "";
					formData.city = resp.details.address_city || "";
					formData.country = resp.details.address_country || "";
				}
				setIsLoading(false);
			}

			if (isLoading) {
				if (id) {
					getProfile();
				}
			}
		},
		[
			dispatch,
			isLoading,
			token,
			id,
			userType,
			formData.firstName,
			formData.lastName,
			formData.email,
			formData.phone,
			formData.streetAddress,
			formData.zip,
			formData.city,
			formData.country,
		]
	);

	const classes = useStyles();

	// checkPassword Data and functions
	const { handleSubmit: handleCheckPasswordSubmit } = useCheckPassword({
		email: formData.email,
		password: formData.password,
		userType,
	});

	const handleSubmit = async (e) => {
		e.preventDefault();

		// check password matches server
		let resp = await handleCheckPasswordSubmit();
		if (resp === false) {
			disabledTrue();
			return;
		}

		// if user provides new password and confirm new password match(if they exist) update the password to be provided to the API
		let password = formData.password;
		// check newPassword doesn't equal ""
		if (formData.newPassword !== "") {
			// checks that newPassword matches the confirmed new password
			if (formData.newPassword === formData.confirmNewPassword) {
				// updates password variable to the newPassword
				password = formData.newPassword;
			}
		}

		if (userType === "user") {
			// update details with API
			resp = await dispatch(
				updateUserWithAPI({
					firstName: formData.firstName,
					lastName: formData.lastName,
					email: formData.email,
					password,
					phone: +formData.phone,
					streetAddress: formData.streetAddress,
					zip: +formData.zip,
					city: formData.city,
					country: formData.country,
					token,
					id,
				})
			);
		} else {
			// update details with API
			resp = await dispatch(
				updateTradesmenWithAPI({
					firstName: formData.firstName,
					lastName: formData.lastName,
					email: formData.email,
					password,
					phone: +formData.phone,
					token,
					id,
				})
			);
		}
		// write logic to update user & tradesmen
		disabledTrue();
	};

	const editButton = (
		<Button
			fullWidth
			variant="contained"
			color="primary"
			className={classes.submit}
			onClick={disabledFalse}
		>
			Edit User Profile?
		</Button>
	);

	if (isLoading) return <Loading />;

	// if user is not logged in token will evaluate to false and you will be redirected to the home page. Otherwise you will go to the dashboard
	return !token ? (
		<Redirect to="/" />
	) : (
		<Container component="main" maxWidth="xs">
			<div className={classes.paper}>
				<Typography
					component="h2"
					variant="h6"
					color="primary"
					gutterBottom
				>
					{userDetails.first_name} {userDetails.last_name} Profile
					Page
				</Typography>
				<UserDetailsForm
					handleSubmit={handleSubmit}
					formData={formData}
					handleChange={handleChange}
					userType={userType}
					disabled={disabled}
					buttonText="Update User Profile"
					editButton={editButton}
					disabledEmail={true}
				/>
			</div>
		</Container>
	);
};

export default UserProfile;
