import React from "react";
import { useSelector } from "react-redux";
import { Typography } from "@material-ui/core";
import LoginButtons from "../LoginButtons/LoginButtons";

const HomeHeading = () => {
	// email can only be found if logged in
	const { email } = useSelector((st) => ({ email: st.login.email }));
	return (
		<>
			<Typography
				component="h1"
				variant="h2"
				align="center"
				color="textPrimary"
				gutterBottom
			>
				Project Freelance
			</Typography>
			<Typography
				variant="h5"
				align="center"
				color="textSecondary"
				paragraph
			>
				Your one stop shop for all of your project outsourcing needs
			</Typography>
			{/* only show login buttons if user is not logged in */}
			{!email ? <LoginButtons /> : null}
		</>
	);
};

export default HomeHeading;
