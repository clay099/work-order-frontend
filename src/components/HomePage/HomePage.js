import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import HomeHeading from "../HomeHeading/HomeHeading";
import AboutProject from "../AboutProject/AboutProject";

const HomePage = () => {
	const useStyles = makeStyles((theme) => ({
		homeContent: {
			backgroundColor: theme.palette.background.paper,
			padding: theme.spacing(8, 0, 6),
		},
	}));

	const classes = useStyles();

	return (
		<div className={classes.homeContent}>
			<HomeHeading />
			<AboutProject />
		</div>
	);
};

export default HomePage;
