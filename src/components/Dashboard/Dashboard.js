import React from "react";
import Projects from "../Projects/Projects";
import { useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import AuctionStageProjects from "../AuctionStageProjects/AuctionStageProjects";

const useStyles = makeStyles((theme) => ({
	dashboard: {
		marginTop: theme.spacing(4),
	},
}));

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
			<Projects />
		</div>
	);
};

export default Dashboard;
