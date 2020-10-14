import React from "react";
import { useSelector } from "react-redux";
import { TableCell } from "@material-ui/core/";
import { NewReleases } from "@material-ui/icons";

const ReviewProjectIcon = ({ id }) => {
	const { bid, userType, project, review } = useSelector((st) => ({
		project: st.projects.projectList.filter(
			(project) => project.id === id
		)[0],
		bid: st.bids[id],
		userType: st.login.user_type,
		// fix to get actual review from state
		review: st.reviews[id],
	}));
	return (
		<div>
			{userType === "user" ? (
				(project.status === "auction" && bid) ||
				(project.status === "completed" && !review) ? (
					<TableCell>
						<NewReleases></NewReleases>
					</TableCell>
				) : null
			) : null}
		</div>
	);
};

export default ReviewProjectIcon;
