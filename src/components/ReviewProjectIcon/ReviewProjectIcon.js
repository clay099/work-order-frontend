import React from "react";
import { useSelector } from "react-redux";
import { TableCell } from "@material-ui/core/";
import { NewReleases } from "@material-ui/icons";

/** ReviewProjectIcon Component
 * @param  {int} id
 *
 * Gets bid, userType, project, review from Redux State
 *
 * Only renders for "user" userType:
 *    - Checks if project status is auction stage and if so checks if any bids have been placed against the project
 *        - Renders NewReleases Icon
 *
 *    - Checks if project status is auction completed and if so checks if the user has created a review for the project
 *        - Renders NewReleases Icon
 *
 *    - renders null if neither conditions are met
 */
const ReviewProjectIcon = ({ id }) => {
	const { bid, userType, project, review } = useSelector((st) => ({
		project: st.projects.projectList.filter(
			(project) => project.id === id
		)[0],
		bid: st.bids[id],
		userType: st.login.user_type,
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
