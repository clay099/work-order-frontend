import React, { useState } from "react";
import { Typography, Grid, Button, Dialog } from "@material-ui/core";
import "./HomeHeading.css";
import LoginButtons from "../LoginButtons/LoginButtons";

const HomeHeading = () => {
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
			<LoginButtons />
		</>
	);
};

export default HomeHeading;
