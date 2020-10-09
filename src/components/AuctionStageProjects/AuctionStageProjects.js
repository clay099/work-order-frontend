import React, { useEffect, useState } from "react";
import { useSelector, useDispatch, shallowEqual } from "react-redux";
import { getAuctionProjectsFromAPI } from "../../actions/projects";
import DisplayTable from "../DisplayTable/DisplayTable";
import { Typography } from "@material-ui/core";

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
				await dispatch(getAuctionProjectsFromAPI({ token }));
				setIsLoading(false);
			}

			if (isLoading) {
				getProjects();
			}
		},
		[dispatch, isLoading, token]
	);

	if (isLoading) return <b>Loading</b>;

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
