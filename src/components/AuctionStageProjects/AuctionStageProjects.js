import React, { useEffect, useState } from "react";
import { useSelector, useDispatch, shallowEqual } from "react-redux";
import { getAuctionProjectsFromAPI } from "../../actions/projects";
import { getBidsFromAPI } from "../../actions/bids";
import DisplayTable from "../DisplayTable/DisplayTable";
import { Typography } from "@material-ui/core";
import Loading from "../Loading/Loading";

/** AuctionStageProjects Component
 *
 * Gets the Redux state for token, and projects at auction stage
 *
 * Sends a request to the API to get the latest Auction Projects & Bids
 *      (bids is required to provide feedback via the ReviewProjectIcon which is rendered as a end result of the DisplayTable component this Components renders)
 *
 * Displays a loading page while API request occurs
 *
 * When loading has finished:
 *
 *    - If there is no projects in auction stage returns heading advising to come back later
 *
 *    - Renders the DisplayTable Component which includes all projects currently in the auction stage and the ability for the tradesmen to bid on these projects or update their current bids.
 *
 */
const AuctionStageProjects = () => {
	const { projects, token } = useSelector(
		(st) => ({
			projects: st.projects.auctionProjectList,
			token: st.login.token,
		}),
		shallowEqual
	);
	const dispatch = useDispatch();
	const [isLoading, setIsLoading] = useState(true);

	useEffect(
		function () {
			async function getProjects() {
				Promise.all([
					await dispatch(getAuctionProjectsFromAPI({ token })),
					await dispatch(getBidsFromAPI({ token })),
				]);
				setIsLoading(false);
			}

			if (isLoading) {
				getProjects();
			}
		},
		[dispatch, isLoading, token]
	);

	if (isLoading) return <Loading />;

	if (!isLoading && projects.length === 0) {
		return (
			<Typography component="body1">
				No current projects are in auction stage. Place come back later
			</Typography>
		);
	}

	const headingList = [
		"Description",
		"Street Address",
		"City",
		"Date Created",
		"Status",
		"Bid",
	];

	return (
		<>
			<DisplayTable
				projectData={projects}
				headingList={headingList}
				tableTitle="Auction Stage Projects"
				tableType="auction"
			/>
		</>
	);
};

export default AuctionStageProjects;
