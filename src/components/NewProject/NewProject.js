import React from "react";
import { useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import NewProjectForm from "../NewProjectForm/NewProjectForm";

const NewProject = () => {
	// gets user email from store
	const { userType, token } = useSelector((st) => ({
		userType: st.login.user_type,
		token: st.login.token,
	}));

	// if user is not logged and userType is not "user"  you will be redirected to the home page. Otherwise you will go to the new project form
	return userType !== "user" ? (
		<Redirect to="/" />
	) : (
		<NewProjectForm token={token} />
	);
};

export default NewProject;
