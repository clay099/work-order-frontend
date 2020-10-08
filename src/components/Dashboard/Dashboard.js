import React from "react";
import Projects from "../Projects/Projects";
import { useSelector } from "react-redux";
import { Redirect } from "react-router-dom";

const Dashboard = () => {
	// gets user email from store
	const { email, userType } = useSelector((st) => ({
		email: st.login.email,
		userType: st.login.user_type,
	}));

	// if user is not logged in email will evaluate to false and you will be redirected to the home page. Otherwise you will go to the dashboard
	return !email ? (
		<Redirect to="/" />
	) : (
		<div>
			{userType === "tradesmen" ? "apply for projects goes here" : null}
			<Projects />
		</div>
	);
};

export default Dashboard;
