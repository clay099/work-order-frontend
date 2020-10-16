import React from "react";
import HomeHeading from "../HomeHeading/HomeHeading";
import AboutProject from "../AboutProject/AboutProject";
import useStyles from "./styles";

/** HomePage Component
 *
 * default page found at "/"
 *
 * Renders:
 *    - HomeHeading Component
 *    - AboutProject Component
 */
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
