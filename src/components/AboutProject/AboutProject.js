import React from "react";
import { Typography } from "@material-ui/core";
import useStyles from "./styles";

const AboutProject = () => {
	const classes = useStyles();

	return (
		<div className={classes.aboutContent}>
			<Typography
				component="h4"
				variant="h4"
				align="center"
				color="textPrimary"
				gutterBottom
			>
				About this project
			</Typography>
			<Typography variant="body1" align="center" paragraph>
				Complete about this project section...
			</Typography>
		</div>
	);
};

export default AboutProject;
