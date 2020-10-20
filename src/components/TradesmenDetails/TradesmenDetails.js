import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch, shallowEqual } from "react-redux";
import { Redirect } from "react-router-dom";
import { getTradesmenDetailsFromAPI } from "../../actions/tradesmen";
import Loading from "../Loading/Loading";

const TradesmenDetails = () => {
	const { id } = useParams();
	const { token, details } = useSelector(
		(st) => ({
			token: st.login.token,
			details: st.tradesmen.details,
		}),
		shallowEqual
	);

	const dispatch = useDispatch();
	const [isLoading, setIsLoading] = useState(true);

	useEffect(
		function () {
			async function getProjects() {
				await dispatch(
					getTradesmenDetailsFromAPI({ token, tradesmenId: id })
				);
				setIsLoading(false);
			}

			if (isLoading) {
				getProjects();
			}
		},
		[dispatch, isLoading, token, id]
	);

	// if user is not logged in token will evaluate to false and you will be redirected to the home page.
	if (!token) {
		return <Redirect to="/" />;
	}

	if (isLoading) return <Loading />;

	return <div>TradesmenDetails go here</div>;
};

export default TradesmenDetails;
