import React from "react";
import Projects from "../Projects/Projects";
import { useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import AuctionStageProjects from "../AuctionStageProjects/AuctionStageProjects";
import useStyles from "./styles";

/**Dashboard Component
 *
 * Landing page for User and tradesmen if logged in
 *
 * Gets the user Email and userType from Redux state
 *
 * If not logged in redirects to home page
 *
 * If logged in displays:
 *   - Auction Table - if userType is "tradesmen"
 *        - Contains details of projects currently in auction stage with the ability to bid on the project
 *
 *   - Projects Table
 *        - Contains details of all projects the user or tradesmen is involved with
 */
const Dashboard = () => {
	// gets user email from store
	const { email, userType } = useSelector((st) => ({
		email: st.login.email,
		userType: st.login.user_type,
	}));

	const classes = useStyles();

	// if user is not logged in email will evaluate to false and you will be redirected to the home page. Otherwise you will go to the dashboard
	return !email ? (
		<Redirect to="/" />
	) : (
		<div className={classes.dashboard}>
			{userType === "tradesmen" ? <AuctionStageProjects /> : null}
			<Projects userType={userType} />
		</div>
	);
};

export default Dashboard;
