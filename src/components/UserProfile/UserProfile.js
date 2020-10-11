import React, { useEffect, useState } from "react";
import { useSelector, useDispatch, shallowEqual } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import { Redirect } from "react-router-dom";
import { Typography } from "@material-ui/core";
import { getUserProfileFromAPI } from "../../actions/user";
import { getTradesmenProfileFromAPI } from "../../actions/tradesmen";
import Loading from "../Loading/Loading";

const useStyles = makeStyles((theme) => ({
	userProfile: {
		marginTop: theme.spacing(4),
	},
}));

const UserProfile = () => {
	const { token, userType, id, userDetails } = useSelector((st) => ({
		token: st.login.token,
		userType: st.login.user_type,
		id: st.login.id,
		userDetails: st.user.details,
	}));

	const dispatch = useDispatch();
	const [isLoading, setIsLoading] = useState(true);

	useEffect(
		function () {
			async function getProfile() {
				console.log(userType);
				if (userType === "user") {
					await dispatch(getUserProfileFromAPI({ token, id }));
				} else {
					await dispatch(getTradesmenProfileFromAPI({ token, id }));
				}
				setIsLoading(false);
			}

			if (isLoading) {
				getProfile();
			}
		},
		[dispatch, isLoading, token]
	);

	const classes = useStyles();

	if (isLoading) return <Loading />;

	// if user is not logged in token will evaluate to false and you will be redirected to the home page. Otherwise you will go to the dashboard
	return !token ? (
		<Redirect to="/" />
	) : (
		<div className={classes.userProfile}>
			<Typography
				component="h2"
				variant="h6"
				color="primary"
				gutterBottom
			>
				{userDetails.first_name} {userDetails.last_name} Profile Page
			</Typography>
		</div>
	);
};

export default UserProfile;
