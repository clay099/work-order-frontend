import React from "react";
import HomeHeading from "../HomeHeading/HomeHeading";
import AboutProject from "../AboutProject/AboutProject";
import useStyles from "./styles";
import { Container, Paper } from "@material-ui/core";

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
			<Container maxWidth="md" component={Paper}>
				<HomeHeading />
				<AboutProject />
			</Container>
		</div>
	);
};

export default HomePage;
