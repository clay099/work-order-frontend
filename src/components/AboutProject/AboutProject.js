import React from "react";
import { Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const HomeHeading = () => {
	const useStyles = makeStyles((theme) => ({
		aboutContent: {
			backgroundColor: theme.palette.background.paper,
			padding: theme.spacing(8, 0, 6),
		},
	}));

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

export default HomeHeading;
