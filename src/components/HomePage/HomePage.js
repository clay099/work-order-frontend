import React from "react";
import HomeHeading from "../HomeHeading/HomeHeading";
import AboutProject from "../AboutProject/AboutProject";
import useStyles from "./styles";

const HomePage = () => {
	const classes = useStyles();

	return (
		<div className={classes.homeContent}>
			<HomeHeading />
			<AboutProject />
		</div>
	);
};

export default HomePage;
