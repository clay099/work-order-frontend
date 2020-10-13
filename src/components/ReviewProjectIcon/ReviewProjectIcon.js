import React from "react";
import { useSelector } from "react-redux";
import { TableCell } from "@material-ui/core/";
import { NewReleases } from "@material-ui/icons";

const ReviewProjectIcon = ({ id }) => {
	const { bid, userType } = useSelector((st) => ({
		bid: st.bids[id],
		userType: st.login.user_type,
	}));
	return (
		<div>
			{userType === "user" && bid ? (
				<TableCell>
					<NewReleases></NewReleases>
				</TableCell>
			) : null}{" "}
		</div>
	);
};

export default ReviewProjectIcon;
