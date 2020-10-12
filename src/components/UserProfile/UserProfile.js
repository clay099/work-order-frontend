import React, { useEffect, useState } from "react";
import { useSelector, useDispatch, shallowEqual } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import { Redirect } from "react-router-dom";
import { Typography, Button, Container } from "@material-ui/core";
import { getUserProfileFromAPI } from "../../actions/user";
import { getTradesmenProfileFromAPI } from "../../actions/tradesmen";
import Loading from "../Loading/Loading";
import useFields from "../../hooks/useFields";
import useToggle from "../../hooks/useToggle";
import UserDetailsForm from "../UserDetailsForm/UserDetailsForm";
import { updateUserWithAPI } from "../../actions/user";

const useStyles = makeStyles((theme) => ({
	paper: {
		marginTop: theme.spacing(2),
		display: "flex",
		flexDirection: "column",
		alignItems: "center",
	},
	submit: {
		margin: theme.spacing(3, 0, 2),
	},
}));

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
	};
	if (userType === "user") {
		INITIALSTATE.streetAddress = "";
		INITIALSTATE.zip = "";
		INITIALSTATE.city = "";
		INITIALSTATE.country = "";
	}

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
				formData.password = "";
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
		[dispatch, isLoading, token, id]
	);

	const classes = useStyles();

	const { formData, handleChange, resetFormData } = useFields(INITIALSTATE);

	const handleSubmit = async (e) => {
		e.preventDefault();
		let resp;

		if (userType === "user") {
			resp = await dispatch(
				updateUserWithAPI({
					firstName: formData.firstName,
					lastName: formData.lastName,
					email: formData.email,
					password: formData.password,
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
				/>
			</div>
		</Container>
	);
};

export default UserProfile;
